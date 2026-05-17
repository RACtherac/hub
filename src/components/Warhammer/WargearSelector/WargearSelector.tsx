import { useState, useEffect } from "react";
import type { WargearOption } from "../../../types/warhammer";

interface Props {
  label?: string;
  wargear: WargearOption[];
  selected: string[];
  onChange: (gear: string[]) => void;
  groups?: string[][];
  counts?: Record<string, number>;
  onCountChange?: (updates: Record<string, number>) => void;
  modelCount?: number;
  checkedNotes?: string[];
}

export default function WargearSelector({ label = "Wargear", wargear, selected, onChange, groups, counts = {}, onCountChange, modelCount, checkedNotes = [] }: Props) {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const hiddenIds = new Set(
      wargear
        .filter((g) => g.showForModelCounts && (modelCount == null || !g.showForModelCounts.includes(modelCount)))
        .map((g) => g.id)
    );
    const toRemove = selected.filter((id) => hiddenIds.has(id));
    if (toRemove.length > 0) onChange(selected.filter((id) => !hiddenIds.has(id)));
  }, [modelCount]);

  const getLinked = (id: string) => wargear.find((w) => w.id === id)?.linkedWargear ?? [];

  const wargearGroupMap: Record<string, string[]> = {};
  wargear.forEach((w) => {
    if (w.wargearGroup) {
      if (!wargearGroupMap[w.wargearGroup]) wargearGroupMap[w.wargearGroup] = [];
      wargearGroupMap[w.wargearGroup].push(w.id);
    }
  });
  const allGroups = [...(groups ?? []), ...Object.values(wargearGroupMap)];

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      const toRemove = new Set([id, ...getLinked(id)]);
      onChange(selected.filter((g) => !toRemove.has(g)));
    } else {
      const matchingGroups = allGroups.filter((g) => g.includes(id));
      const allGroupMembers = matchingGroups.flatMap((g) => g);
      const groupDeselected = allGroupMembers.filter((g) => selected.includes(g));
      const linkedFromGroup = groupDeselected.flatMap((g) => getLinked(g));
      const toRemove = new Set([...allGroupMembers, ...linkedFromGroup]);
      const filtered = selected.filter((g) => !toRemove.has(g));
      const toAdd = [id, ...getLinked(id)];
      onChange([...filtered, ...toAdd.filter((a) => !filtered.includes(a))]);
    }
  };

  const visibleWargear = wargear.filter((g) => !g.showForModelCounts || (modelCount != null && g.showForModelCounts.includes(modelCount)));
  const withImages = visibleWargear.filter((g) => g.image);

  return (
    <div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
        }}>
          {label}
        </div>

        {(
          <button
            onClick={() => setShowImages(!showImages)}
            style={{
              background: showImages ? "var(--accent-dim)" : "none",
              border: `1px solid ${showImages ? "var(--accent)" : "var(--border-2)"}`,
              color: showImages ? "var(--accent)" : "var(--text-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "2px 8px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {showImages ? "hide images" : "show images"}
          </button>
        )}
      </div>

      {showImages && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "12px",
          padding: "12px",
          background: "var(--surface-2, rgba(255,255,255,0.03))",
          border: "1px solid var(--border)",
        }}>
          {withImages.map((gear) => (
            <div
              key={gear.id}
              onClick={() => toggle(gear.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                opacity: selected.includes(gear.id) ? 1 : 0.45,
                transition: "opacity 0.15s",
              }}
            >
              <div style={{
                width: "80px",
                height: "80px",
                border: `1px solid ${selected.includes(gear.id) ? "var(--accent)" : "var(--border-2)"}`,
                background: selected.includes(gear.id) ? "var(--accent-dim)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.15s, background 0.15s",
              }}>
                <img
                  src={gear.image}
                  alt={gear.name}
                  style={{ maxWidth: "68px", maxHeight: "68px", objectFit: "contain" }}
                />
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.08em",
                color: selected.includes(gear.id) ? "var(--accent)" : "var(--text-dim)",
                textAlign: "center",
                maxWidth: "80px",
                transition: "color 0.15s",
              }}>
                {gear.name}
              </span>
            </div>
          ))}
        </div>
      )}


      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {visibleWargear.map((gear) => {
          if (gear.countable) {
            const baseMax = modelCount != null && gear.maxCountByModelCount
              ? (gear.maxCountByModelCount[modelCount] ?? 0)
              : 99;
            const noteReduction = (gear.maxCountReducedByNotes ?? []).filter(id => checkedNotes.includes(id)).length;
            const wargearReduction = (gear.maxCountReducedByWargear ?? []).reduce((sum, id) => sum + (counts[id] ?? 0), 0);
            const max = Math.max(0, baseMax - noteReduction - wargearReduction);

            // Linked counter: this item's display count is derived from its linked partner
            const isLinked = !!gear.linkedCounterId;
            const primaryCount = counts[isLinked ? gear.linkedCounterId! : gear.id] ?? 0;
            const count = isLinked ? max - primaryCount : primaryCount;
            const active = count > 0;

            const handleDecrement = () => {
              if (isLinked) {
                // Decreasing this (e.g. power fist) increases the linked (chainfist)
                onCountChange?.({ [gear.linkedCounterId!]: Math.min(max, primaryCount + 1) });
              } else {
                const linked = wargear.find(w => w.linkedCounterId === gear.id);
                onCountChange?.({ [gear.id]: Math.max(0, count - 1), ...(linked ? {} : {}) });
              }
            };
            const handleIncrement = () => {
              if (isLinked) {
                onCountChange?.({ [gear.linkedCounterId!]: Math.max(0, primaryCount - 1) });
              } else {
                const updates: Record<string, number> = { [gear.id]: Math.min(max, count + 1) };
                if (count === 0) {
                  const matchingGroups = allGroups.filter((g) => g.includes(gear.id));
                  matchingGroups.flatMap((g) => g).forEach((memberId) => {
                    if (memberId !== gear.id) updates[memberId] = 0;
                  });
                }
                onCountChange?.(updates);
              }
            };

            return (
              <div key={gear.id} style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                background: active ? "var(--accent-dim)" : "none",
                transition: "all 0.15s",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: active ? "var(--accent)" : "var(--text-dim)",
                  padding: "5px 10px",
                }}>
                  {gear.name}
                  {gear.points != null && gear.points > 0 && (
                    <span style={{ opacity: 0.7, marginLeft: "4px" }}>+{gear.points}ea</span>
                  )}
                </span>
                <button
                  onClick={handleDecrement}
                  disabled={count === 0}
                  style={{
                    background: "none",
                    border: "none",
                    borderLeft: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                    color: count === 0 ? "var(--border-2)" : "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    padding: "3px 8px",
                    cursor: count === 0 ? "default" : "pointer",
                    lineHeight: 1,
                  }}
                >−</button>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: active ? "var(--accent)" : "var(--text-dim)",
                  padding: "0 6px",
                  minWidth: "20px",
                  textAlign: "center",
                }}>{count}</span>
                <button
                  onClick={handleIncrement}
                  disabled={count >= max}
                  style={{
                    background: "none",
                    border: "none",
                    borderLeft: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                    color: count >= max ? "var(--border-2)" : "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    padding: "3px 8px",
                    cursor: count >= max ? "default" : "pointer",
                    lineHeight: 1,
                  }}
                >+</button>
              </div>
            );
          }

          const active = selected.includes(gear.id);
          return (
            <button
              key={gear.id}
              onClick={() => toggle(gear.id)}
              style={{
                background: active ? "var(--accent-dim)" : "none",
                border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                color: active ? "var(--accent)" : "var(--text-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.08em",
                padding: "5px 12px",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{
                width: "5px",
                height: "5px",
                background: active ? "var(--accent)" : "var(--border-2)",
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                flexShrink: 0,
                transition: "background 0.15s",
              }} />
              {gear.name}
              {gear.points != null && gear.points > 0 && (
                <span style={{ color: active ? "var(--accent)" : "var(--text-dim)", opacity: 0.7 }}>
                  +{gear.points}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
