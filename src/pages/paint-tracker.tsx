import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/paint-tracker.css";

interface PaintEntry {
  id: string;
  brand: string;
  color: string;
  area: string;
  technique: string;
}

interface PaintCollection {
  id: string;
  name: string;
  paints: PaintEntry[];
}

interface MiniatureRecord {
  id: string;
  name: string;
  faction: string;
  imageBase64: string;
  collections: PaintCollection[];
  notes: string;
  createdAt: string;
}

const STORAGE_KEY = "miniature-paint-records";

function loadRecords(): MiniatureRecord[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // Migrate old records that have flat `paints` instead of `collections`
    return raw.map((r: any) => {
      if (!r.collections && r.paints) {
        return {
          ...r,
          collections: [{ id: crypto.randomUUID(), name: "Paint Recipe", paints: r.paints }],
        };
      }
      return r;
    });
  } catch {
    return [];
  }
}

function saveRecords(records: MiniatureRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function newPaint(): PaintEntry {
  return { id: crypto.randomUUID(), brand: "", color: "", area: "", technique: "" };
}

function newCollection(): PaintCollection {
  return { id: crypto.randomUUID(), name: "", paints: [newPaint()] };
}

function totalPaints(record: MiniatureRecord): number {
  return record.collections.reduce(
    (sum, c) => sum + c.paints.filter((p) => p.color).length,
    0
  );
}

// ── Gallery View ──────────────────────────────────────────────────────────────

function GalleryCard({
  record,
  onClick,
}: {
  record: MiniatureRecord;
  onClick: () => void;
}) {
  return (
    <article className="pt-card" onClick={onClick}>
      <div className="pt-card-img-wrap">
        {record.imageBase64 ? (
          <img src={record.imageBase64} alt={record.name} className="pt-card-img" />
        ) : (
          <div className="pt-card-img-placeholder">
            <span>no image</span>
          </div>
        )}
        <div className="pt-card-paint-count">
          {totalPaints(record)}
          <span>paints</span>
        </div>
      </div>
      <div className="pt-card-body">
        <p className="pt-card-faction">{record.faction || "Unknown Faction"}</p>
        <h3 className="pt-card-name">{record.name || "Untitled Miniature"}</h3>
        <p className="pt-card-date">
          {new Date(record.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <span className="pt-card-arrow">↗</span>
    </article>
  );
}

// ── Detail View ───────────────────────────────────────────────────────────────

function DetailView({
  record,
  onBack,
  onEdit,
  onDelete,
}: {
  record: MiniatureRecord;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  function exportRecord() {
    const data = { version: 1, exportedAt: new Date().toISOString(), records: [record] };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(record.name || "miniature").replace(/\s+/g, "-").toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    const cols = record.collections
      .map((c) => ({ ...c, paints: c.paints.filter((p) => p.color || p.brand) }))
      .filter((c) => c.paints.length > 0);

    const collectionsHTML = cols.map((col) => `
      ${col.name ? `<h3 class="col-name">${col.name}</h3>` : ""}
      <table>
        <thead>
          <tr><th>#</th><th>Color</th><th>Brand</th><th>Area</th><th>Technique</th></tr>
        </thead>
        <tbody>
          ${col.paints.map((p, i) => `
            <tr>
              <td class="num">${String(i + 1).padStart(2, "0")}</td>
              <td><strong>${p.color || "—"}</strong></td>
              <td>${p.brand || "—"}</td>
              <td>${p.area || "—"}</td>
              <td>${p.technique || "—"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `).join("");

    const imageHTML = record.imageBase64
      ? `<img src="${record.imageBase64}" class="mini-img" alt="${record.name}" />`
      : "";

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${record.name || "Paint Recipe"}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 12px; color: #1a1a1a; padding: 32px; }
    .header { display: flex; gap: 24px; align-items: flex-start; margin-bottom: 28px; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; }
    .mini-img { width: 120px; height: 120px; object-fit: cover; border: 1px solid #ccc; flex-shrink: 0; }
    .meta { flex: 1; }
    .faction { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #666; margin-bottom: 4px; }
    .mini-name { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    .date { font-size: 10px; color: #999; margin-bottom: 10px; }
    .notes { font-size: 11px; color: #444; line-height: 1.6; border-left: 3px solid #e8c547; padding-left: 10px; }
    .recipe-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #999; margin-bottom: 14px; }
    .col-name { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin: 16px 0 8px; color: #333; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; text-align: left; padding: 6px 8px; background: #f4f4f4; border-bottom: 1px solid #ddd; color: #666; }
    td { padding: 7px 8px; border-bottom: 1px solid #eee; vertical-align: top; }
    td.num { color: #aaa; font-size: 10px; width: 28px; }
    tr:last-child td { border-bottom: none; }
    .footer { margin-top: 32px; font-size: 9px; color: #bbb; letter-spacing: 0.08em; }
  </style>
</head>
<body>
  <div class="header">
    ${imageHTML}
    <div class="meta">
      <p class="faction">${record.faction || "Unknown Faction"}</p>
      <h1 class="mini-name">${record.name || "Untitled Miniature"}</h1>
      <p class="date">Recorded ${new Date(record.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      ${record.notes ? `<p class="notes">${record.notes}</p>` : ""}
    </div>
  </div>
  <p class="recipe-label">// paint recipe</p>
  ${cols.length === 0 ? "<p>No paints recorded.</p>" : collectionsHTML}
  <p class="footer">Exported from Paint Tracker · ${new Date().toLocaleDateString()}</p>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
  }
  const collections = record.collections
    .map((c) => ({
      ...c,
      paints: c.paints.filter((p) => p.color || p.brand || p.area || p.technique),
    }))
    .filter((c) => c.paints.length > 0);

  return (
    <div className="pt-detail">
      <div className="pt-detail-header">
        <button className="pt-back-btn" onClick={onBack}>
          ← back
        </button>
        <div className="pt-detail-actions">
          <button className="pt-edit-btn" onClick={onEdit}>
            edit
          </button>
          <button className="pt-io-btn" onClick={exportRecord}>
            JSON ↓
          </button>
          <button className="pt-io-btn" onClick={exportPDF}>
            PDF ↓
          </button>
          <button className="pt-delete-btn" onClick={onDelete}>
            delete
          </button>
        </div>
      </div>

      <div className="pt-detail-layout">
        <div className="pt-detail-image-col">
          {record.imageBase64 ? (
            <img src={record.imageBase64} alt={record.name} className="pt-detail-img" />
          ) : (
            <div className="pt-detail-img-placeholder">no image</div>
          )}
          <p className="pt-detail-date">
            Recorded{" "}
            {new Date(record.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="pt-detail-info-col">
          <p className="pt-detail-faction">{record.faction || "Unknown Faction"}</p>
          <h2 className="pt-detail-name">{record.name || "Untitled Miniature"}</h2>

          {record.notes && (
            <p className="pt-detail-notes">{record.notes}</p>
          )}

          <div className="pt-recipe-header">
            <span className="pt-recipe-label">// paint recipe</span>
            <div className="pt-recipe-line" />
          </div>

          {collections.length === 0 ? (
            <p className="pt-no-paints">No paints recorded.</p>
          ) : (
            <div className="pt-collections">
              {collections.map((col) => (
                <div key={col.id} className="pt-collection-section">
                  {col.name && (
                    <p className="pt-collection-name">{col.name}</p>
                  )}
                  <ol className="pt-paint-list">
                    {col.paints.map((p, i) => (
                      <li key={p.id} className="pt-paint-row">
                        <span className="pt-paint-num">{String(i + 1).padStart(2, "0")}</span>
                        <div className="pt-paint-info">
                          <span className="pt-paint-color">{p.color}</span>
                          {p.brand && <span className="pt-paint-brand">{p.brand}</span>}
                          {p.area && <span className="pt-paint-area">{p.area}</span>}
                          {p.technique && <span className="pt-paint-technique">{p.technique}</span>}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Editor Form ───────────────────────────────────────────────────────────────

function EditorForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: MiniatureRecord;
  onSave: (record: MiniatureRecord) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [faction, setFaction] = useState(initial?.faction ?? "");
  const [imageBase64, setImageBase64] = useState(initial?.imageBase64 ?? "");
  const [collections, setCollections] = useState<PaintCollection[]>(
    initial?.collections?.length ? initial.collections : [newCollection()]
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const fileRef = useRef<HTMLInputElement>(null);
  const dragPaint = useRef<{ collectionId: string; paintId: string } | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  }

  // ── Collection mutations ──
  function addCollection() {
    setCollections((prev) => [...prev, newCollection()]);
  }

  function removeCollection(id: string) {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  }

  function renameCollection(id: string, value: string) {
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: value } : c))
    );
  }

  // ── Paint mutations ──
  function addPaint(collectionId: string) {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId ? { ...c, paints: [...c.paints, newPaint()] } : c
      )
    );
  }

  function removePaint(collectionId: string, paintId: string) {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, paints: c.paints.filter((p) => p.id !== paintId) }
          : c
      )
    );
  }

  function updatePaint(
    collectionId: string,
    paintId: string,
    field: keyof PaintEntry,
    value: string
  ) {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? {
              ...c,
              paints: c.paints.map((p) =>
                p.id === paintId ? { ...p, [field]: value } : p
              ),
            }
          : c
      )
    );
  }

  function handleDragStart(collectionId: string, paintId: string) {
    dragPaint.current = { collectionId, paintId };
  }

  function handleDrop(targetCollectionId: string) {
    setDropTarget(null);
    const src = dragPaint.current;
    if (!src) return;
    dragPaint.current = null;
    if (src.collectionId === targetCollectionId) return;
    setCollections((prev) => {
      const paint = prev.find((c) => c.id === src.collectionId)?.paints.find((p) => p.id === src.paintId);
      if (!paint) return prev;
      return prev.map((c) => {
        if (c.id === src.collectionId) return { ...c, paints: c.paints.filter((p) => p.id !== src.paintId) };
        if (c.id === targetCollectionId) return { ...c, paints: [...c.paints, paint] };
        return c;
      });
    });
  }

  function handleSave() {
    const record: MiniatureRecord = {
      id: initial?.id ?? crypto.randomUUID(),
      name,
      faction,
      imageBase64,
      collections,
      notes,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    };
    onSave(record);
  }

  return (
    <div className="pt-editor">
      <div className="pt-editor-header">
        <button className="pt-back-btn" onClick={onCancel}>
          ← cancel
        </button>
        <button className="pt-save-btn" onClick={handleSave}>
          save miniature
        </button>
      </div>

      <div className="pt-editor-layout">
        {/* Left: Image upload */}
        <div className="pt-editor-image-col">
          <div
            className="pt-image-drop"
            onClick={() => fileRef.current?.click()}
          >
            {imageBase64 ? (
              <img src={imageBase64} alt="preview" className="pt-image-preview" />
            ) : (
              <div className="pt-image-empty">
                <span className="pt-image-icon">+</span>
                <span>Upload image</span>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          {imageBase64 && (
            <button
              className="pt-clear-img"
              onClick={() => setImageBase64("")}
            >
              remove image
            </button>
          )}
        </div>

        {/* Right: Fields */}
        <div className="pt-editor-fields-col">
          <div className="pt-field-group">
            <label className="pt-label">Miniature Name</label>
            <input
              className="pt-input"
              placeholder="e.g. Space Marine Sergeant"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="pt-field-group">
            <label className="pt-label">Faction / Unit Type</label>
            <input
              className="pt-input"
              placeholder="e.g. Ultramarines, Death Guard…"
              value={faction}
              onChange={(e) => setFaction(e.target.value)}
            />
          </div>

          <div className="pt-field-group">
            <label className="pt-label">Notes</label>
            <textarea
              className="pt-textarea"
              placeholder="Technique notes, tips, reminders…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="pt-recipe-header">
            <span className="pt-recipe-label">// paint recipe</span>
            <div className="pt-recipe-line" />
          </div>

          {collections.map((col, colIndex) => (
            <div
              key={col.id}
              className={`pt-collection-block${dropTarget === col.id ? " pt-collection-block--drop-target" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDropTarget(col.id); }}
              onDragLeave={() => setDropTarget(null)}
              onDrop={() => handleDrop(col.id)}
            >
              <div className="pt-collection-block-header">
                <input
                  className="pt-input pt-collection-name-input"
                  placeholder={`Collection ${colIndex + 1} name (e.g. Armor, Skin…)`}
                  value={col.name}
                  onChange={(e) => renameCollection(col.id, e.target.value)}
                />
                {collections.length > 1 && (
                  <button
                    className="pt-remove-collection-btn"
                    onClick={() => removeCollection(col.id)}
                    title="Remove collection"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="pt-paint-entries">
                {col.paints.map((paint, i) => (
                  <div
                    key={paint.id}
                    className="pt-paint-entry"
                    draggable
                    onDragStart={() => handleDragStart(col.id, paint.id)}
                    onDragEnd={() => { dragPaint.current = null; setDropTarget(null); }}
                  >
                    <span className="pt-entry-num">{String(i + 1).padStart(2, "0")}</span>
                    <input
                      className="pt-input pt-input-sm"
                      placeholder="Color name"
                      value={paint.color}
                      onChange={(e) =>
                        updatePaint(col.id, paint.id, "color", e.target.value)
                      }
                    />
                    <input
                      className="pt-input pt-input-sm"
                      placeholder="Brand"
                      value={paint.brand}
                      onChange={(e) =>
                        updatePaint(col.id, paint.id, "brand", e.target.value)
                      }
                    />
                    <input
                      className="pt-input pt-input-sm"
                      placeholder="Area used"
                      value={paint.area}
                      onChange={(e) =>
                        updatePaint(col.id, paint.id, "area", e.target.value)
                      }
                    />
                    <input
                      className="pt-input pt-input-sm"
                      placeholder="Technique"
                      value={paint.technique}
                      onChange={(e) =>
                        updatePaint(col.id, paint.id, "technique", e.target.value)
                      }
                    />
                    {col.paints.length > 1 && (
                      <button
                        className="pt-remove-btn"
                        onClick={() => removePaint(col.id, paint.id)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button className="pt-add-paint-btn" onClick={() => addPaint(col.id)}>
                + add paint
              </button>
            </div>
          ))}

          <button className="pt-add-collection-btn" onClick={addCollection}>
            + add collection
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

type View =
  | { type: "gallery" }
  | { type: "detail"; id: string }
  | { type: "editor"; id: string | null };

function matchesPaint(paint: PaintEntry, q: string): boolean {
  return (
    paint.color.toLowerCase().includes(q) ||
    paint.brand.toLowerCase().includes(q) ||
    paint.area.toLowerCase().includes(q)
  );
}

export default function PaintTracker() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MiniatureRecord[]>(loadRecords);
  const [view, setView] = useState<View>({ type: "gallery" });
  const [searchQuery, setSearchQuery] = useState("");
  const importRef = useRef<HTMLInputElement>(null);

  function exportAllRecords() {
    const data = { version: 1, exportedAt: new Date().toISOString(), records };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `paint-tracker-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importRecords(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        const incoming: MiniatureRecord[] = data.records ?? data;
        if (!Array.isArray(incoming)) { alert("Invalid backup file."); return; }
        setRecords((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const newOnes = incoming.filter((r) => !existingIds.has(r.id));
          return [...prev, ...newOnes];
        });
      } catch {
        alert("Could not read backup file.");
      }
    };
    reader.readAsText(file);
  }

  useEffect(() => {
    saveRecords(records);
  }, [records]);

  function handleSave(record: MiniatureRecord) {
    setRecords((prev) => {
      const exists = prev.find((r) => r.id === record.id);
      return exists
        ? prev.map((r) => (r.id === record.id ? record : r))
        : [record, ...prev];
    });
    setView({ type: "detail", id: record.id });
  }

  function handleDelete(id: string) {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setView({ type: "gallery" });
  }

  const currentRecord =
    view.type !== "gallery"
      ? records.find((r) => r.id === (view.type === "detail" ? view.id : view.id))
      : undefined;

  const q = searchQuery.trim().toLowerCase();
  const filteredRecords = q
    ? records.filter((r) =>
        r.collections.some((c) => c.paints.some((p) => matchesPaint(p, q)))
      )
    : records;

  return (
    <div className="pt-page">
      {/* Top bar */}
      <div className="pt-topbar">
        <button className="pt-topbar-back" onClick={() => navigate("/")}>
          ← OH<span>/</span>Hub
        </button>
        <span className="pt-topbar-title">Paint Tracker</span>
      </div>

      {view.type === "gallery" && (
        <div className="pt-gallery-view">
          <header className="pt-hero">
            <p className="pt-eyebrow">// miniature workshop</p>
            <h1 className="pt-title">
              Your <em>Paint</em> Library
            </h1>
            <p className="pt-subtitle">
              {records.length} miniature{records.length !== 1 ? "s" : ""} recorded
            </p>
          </header>

          <div className="pt-gallery-actions">
            <div className="pt-search-wrap">
              <input
                className="pt-search-input"
                type="text"
                placeholder="Search by color, brand, or area…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="pt-search-clear" onClick={() => setSearchQuery("")}>×</button>
              )}
            </div>
            <div className="pt-actions-right">
              <button className="pt-io-btn" onClick={exportAllRecords}>Export ↓</button>
              <input
                ref={importRef}
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) importRecords(f); e.target.value = ""; }}
              />
              <button className="pt-io-btn" onClick={() => importRef.current?.click()}>Import ↑</button>
              <button
                className="pt-new-btn"
                onClick={() => setView({ type: "editor", id: null })}
              >
                + New Miniature
              </button>
            </div>
          </div>

          {records.length === 0 ? (
            <div className="pt-empty">
              <p className="pt-empty-title">No miniatures yet</p>
              <p className="pt-empty-sub">
                Add your first miniature to start tracking your paint recipes.
              </p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="pt-empty">
              <p className="pt-empty-title">No results</p>
              <p className="pt-empty-sub">No miniatures use "{searchQuery}" in their recipe.</p>
            </div>
          ) : (
            <section className="pt-grid">
              {filteredRecords.map((r) => (
                <GalleryCard
                  key={r.id}
                  record={r}
                  onClick={() => setView({ type: "detail", id: r.id })}
                />
              ))}
            </section>
          )}
        </div>
      )}

      {view.type === "detail" && currentRecord && (
        <DetailView
          record={currentRecord}
          onBack={() => setView({ type: "gallery" })}
          onEdit={() => setView({ type: "editor", id: currentRecord.id })}
          onDelete={() => handleDelete(currentRecord.id)}
        />
      )}

      {view.type === "editor" && (
        <EditorForm
          initial={view.id ? currentRecord : undefined}
          onSave={handleSave}
          onCancel={() =>
            view.id
              ? setView({ type: "detail", id: view.id })
              : setView({ type: "gallery" })
          }
        />
      )}
    </div>
  );
}
