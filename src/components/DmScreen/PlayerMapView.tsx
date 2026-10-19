import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { groundStyle, mapBounds, MAP_ZOOM_MAX, MAP_ZOOM_MIN, zoomMapAt, type MapView } from "../../utils/dmMap";
import { STORAGE_KEY, parseData, type DmScreenData } from "../../utils/dmScreen";
import { FogLayer, MapContent } from "./MapLayers";

// =====================================
// Player view
// =====================================
//
// A window for the players' screen. It shows the DM's current map without
// hidden pieces and with solid fog, and follows the DM's changes live: the DM
// screen saves to localStorage, and other windows get a "storage" event.

function load(): DmScreenData | null {
    try {
        return parseData(localStorage.getItem(STORAGE_KEY));
    }
    catch {
        return null;
    }
}

export default function PlayerMapView() {
    const [data, setData] = useState<DmScreenData | null>(load);
    const [view, setView] = useState<MapView>({ x: 0, y: 0, zoom: 1 });
    const boardRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ startX: number; startY: number; viewX: number; viewY: number } | null>(null);
    // The map and the "show players this view" request already applied.
    const shown = useRef<{ mapId: string; at: number } | null>(null);

    const map = data ? data.maps.find((m) => m.id === data.activeMapId) ?? data.maps[0] : undefined;

    useEffect(() => {
        document.title = "Player view";
        const onStorage = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY) setData(parseData(event.newValue));
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const fit = () => {
        const rect = boardRef.current?.getBoundingClientRect();
        const bounds = map && mapBounds(map);
        if (!rect || !bounds) return;
        const zoom = Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, Math.min(
            (rect.width - 48) / Math.max(1, bounds.maxX - bounds.minX),
            (rect.height - 48) / Math.max(1, bounds.maxY - bounds.minY)
        )));
        setView({
            zoom,
            x: rect.width / 2 - ((bounds.minX + bounds.maxX) / 2) * zoom,
            y: rect.height / 2 - ((bounds.minY + bounds.maxY) / 2) * zoom,
        });
    };

    // Fit when a new map is shown, and jump to the DM's view when they send one.
    useEffect(() => {
        if (!map) return;
        const rect = boardRef.current?.getBoundingClientRect();
        const sent = map.playerView;
        const isNewMap = shown.current?.mapId !== map.id;
        const isNewSend = !!sent && sent.at !== shown.current?.at;
        if (!isNewMap && !isNewSend) return;
        shown.current = { mapId: map.id, at: sent?.at ?? 0 };

        if (sent && rect && (isNewSend || isNewMap)) {
            const zoom = Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, rect.width / sent.span));
            setView({ zoom, x: rect.width / 2 - sent.cx * zoom, y: rect.height / 2 - sent.cy * zoom });
        }
        else fit();
        // Only for a new map or a new send; every other edit leaves the players' pan and zoom alone.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map?.id, map?.playerView?.at]);

    useEffect(() => {
        const element = boardRef.current;
        if (!element) return;
        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const rect = element.getBoundingClientRect();
            setView((current) => zoomMapAt(current, Math.exp(-event.deltaY * 0.0015), event.clientX - rect.left, event.clientY - rect.top));
        };
        element.addEventListener("wheel", onWheel, { passive: false });
        return () => element.removeEventListener("wheel", onWheel);
    }, []);

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        dragRef.current = { startX: event.clientX, startY: event.clientY, viewX: view.x, viewY: view.y };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: ReactPointerEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        setView((current) => ({ ...current, x: drag.viewX + event.clientX - drag.startX, y: drag.viewY + event.clientY - drag.startY }));
    };

    const toggleFullscreen = () => {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen?.();
    };

    if (!map) {
        return (
            <div className="dms-player">
                <p className="dms-player-empty">Open the DM Screen's Map tab in another window to show a map here.</p>
            </div>
        );
    }

    return (
        <div className="dms-player">
            <div
                ref={boardRef}
                className="dms-player-board"
                style={{ backgroundColor: map.fog.enabled ? "#060608" : groundStyle(map.ground).color }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={() => { dragRef.current = null; }}
                onPointerCancel={() => { dragRef.current = null; }}
            >
                <svg className="dms-map-svg">
                    <g transform={`translate(${view.x} ${view.y}) scale(${view.zoom})`}>
                        <MapContent map={map} audience="player" />
                        <FogLayer fog={map.fog} audience="player" />
                    </g>
                </svg>
            </div>
            <div className="dms-player-controls">
                <button type="button" onClick={() => setView((v) => zoomMapAt(v, 1 / 1.2, window.innerWidth / 2, window.innerHeight / 2))} aria-label="Zoom out">−</button>
                <button type="button" onClick={() => setView((v) => zoomMapAt(v, 1.2, window.innerWidth / 2, window.innerHeight / 2))} aria-label="Zoom in">+</button>
                <button type="button" onClick={fit}>Fit</button>
                <button type="button" onClick={toggleFullscreen}>Fullscreen</button>
            </div>
        </div>
    );
}
