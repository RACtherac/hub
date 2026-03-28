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

interface MiniatureRecord {
  id: string;
  name: string;
  faction: string;
  imageBase64: string;
  paints: PaintEntry[];
  notes: string;
  createdAt: string;
}

const STORAGE_KEY = "miniature-paint-records";

function loadRecords(): MiniatureRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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
          {record.paints.filter((p) => p.color).length}
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
  const paints = record.paints.filter((p) => p.color || p.brand || p.area || p.technique);

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

          {paints.length === 0 ? (
            <p className="pt-no-paints">No paints recorded.</p>
          ) : (
            <ol className="pt-paint-list">
              {paints.map((p, i) => (
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
  const [paints, setPaints] = useState<PaintEntry[]>(
    initial?.paints.length ? initial.paints : [newPaint()]
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  }

  function updatePaint(id: string, field: keyof PaintEntry, value: string) {
    setPaints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  function addPaint() {
    setPaints((prev) => [...prev, newPaint()]);
  }

  function removePaint(id: string) {
    setPaints((prev) => prev.filter((p) => p.id !== id));
  }

  function handleSave() {
    const record: MiniatureRecord = {
      id: initial?.id ?? crypto.randomUUID(),
      name,
      faction,
      imageBase64,
      paints,
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

          <div className="pt-paint-entries">
            {paints.map((paint, i) => (
              <div key={paint.id} className="pt-paint-entry">
                <span className="pt-entry-num">{String(i + 1).padStart(2, "0")}</span>
                <input
                  className="pt-input pt-input-sm"
                  placeholder="Color name"
                  value={paint.color}
                  onChange={(e) => updatePaint(paint.id, "color", e.target.value)}
                />
                <input
                  className="pt-input pt-input-sm"
                  placeholder="Brand"
                  value={paint.brand}
                  onChange={(e) => updatePaint(paint.id, "brand", e.target.value)}
                />
                <input
                  className="pt-input pt-input-sm"
                  placeholder="Area used"
                  value={paint.area}
                  onChange={(e) => updatePaint(paint.id, "area", e.target.value)}
                />
                <input
                  className="pt-input pt-input-sm"
                  placeholder="Technique"
                  value={paint.technique}
                  onChange={(e) => updatePaint(paint.id, "technique", e.target.value)}
                />
                {paints.length > 1 && (
                  <button
                    className="pt-remove-btn"
                    onClick={() => removePaint(paint.id)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button className="pt-add-paint-btn" onClick={addPaint}>
            + add paint
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
    ? records.filter((r) => r.paints.some((p) => matchesPaint(p, q)))
    : records;

  return (
    <div className="pt-page">
      {/* Top bar */}
      <div className="pt-topbar">
        <button className="pt-topbar-back" onClick={() => navigate("/")}>
          OH<span>/</span>Hub
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
            <button
              className="pt-new-btn"
              onClick={() => setView({ type: "editor", id: null })}
            >
              + New Miniature
            </button>
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
