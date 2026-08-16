import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/paint-tracker.css";

interface InventoryEntry {
  id: string;
  brand: string;
  color: string;
  category?: string;
}

const INVENTORY_KEY = "paint-inventory";

function loadInventory(): InventoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(INVENTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveInventory(items: InventoryEntry[]) {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
}

export default function PaintInventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryEntry[]>(loadInventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const colorRef = useRef<HTMLInputElement | null>(null);
  const brandRef = useRef<HTMLInputElement | null>(null);
  const [newCategory, setNewCategory] = useState<string>("base");

  useEffect(() => {
    saveInventory(items);
  }, [items]);

  function addItem() {
    const color = colorRef.current?.value?.trim() || "";
    const brand = brandRef.current?.value?.trim() || "";
    if (!color) return;
    setItems((prev) => [{ id: crypto.randomUUID(), brand, color, category: newCategory || "" }, ...prev]);
    if (colorRef.current) colorRef.current.value = "";
    if (brandRef.current) brandRef.current.value = "";
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function exportInventory() {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paint-inventory-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importInventory(file: File) {
    const r = new FileReader();
    r.onload = (e) => {
      try {
        const incomingRaw = JSON.parse(e.target?.result as string) as any;
        const incoming = (incomingRaw as any[]).map((it) => ({ id: it.id ?? crypto.randomUUID(), brand: it.brand ?? "", color: it.color ?? "", category: it.category ?? "" }));
        if (!Array.isArray(incoming)) throw new Error("bad");
        const existing = loadInventory();
        const existingSet = new Set(existing.map((i) => `${i.brand}::${i.color}`));
        const merged = [...existing];
        for (const it of incoming) {
          const key = `${it.brand}::${it.color}`;
          if (!existingSet.has(key)) { merged.push({ id: crypto.randomUUID(), brand: it.brand || "", color: it.color || "", category: it.category || "" }); existingSet.add(key); }
        }
        setItems(merged);
      } catch {
        alert("Invalid inventory file");
      }
    };
    r.readAsText(file);
  }

  return (
    <div className="pt-page">
      <div className="pt-topbar">
        <button className="pt-topbar-back" onClick={() => navigate(-1)}>
          ← back
        </button>
        <span className="pt-topbar-title">Paint Inventory</span>
      </div>

      <div className="pt-gallery-view" style={{ padding: 20 }}>
        <header className="pt-hero">
          <h1 className="pt-title">Paint Inventory</h1>
          <p className="pt-subtitle">Manage your commonly used paint brands and colours.</p>
        </header>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input ref={colorRef} placeholder="Color name (required)" className="pt-input" style={{ minWidth: 200 }} />
          <input ref={brandRef} placeholder="Brand (optional)" className="pt-input" style={{ minWidth: 160 }} />
          <select className="pt-input" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ width: 140 }}>
            <option value="base">Base</option>
            <option value="layer">Layer</option>
            <option value="technical">Technical</option>
            <option value="wash">Wash</option>
            <option value="contrast">Contrast</option>
          </select>
          <button className="pt-new-btn" onClick={addItem}>+ Add</button>
          <button className="pt-io-btn" onClick={exportInventory}>Export ↓</button>
          <input type="file" accept=".json" style={{ display: "none" }} id="inv-import" onChange={(e) => { const f = e.target.files?.[0]; if (f) importInventory(f); e.currentTarget.value = ""; }} />
          <label htmlFor="inv-import" className="pt-io-btn" style={{ cursor: "pointer" }}>Import ↑</label>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
          <input placeholder="Search paints…" className="pt-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ minWidth: 220 }} />
          <select className="pt-input" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ width: 160 }}>
            <option value="all">All types</option>
            <option value="base">Base</option>
            <option value="layer">Layer</option>
            <option value="technical">Technical</option>
            <option value="wash">Wash</option>
            <option value="contrast">Contrast</option>
          </select>
        </div>

        {items.length === 0 ? (
          <div className="pt-empty">
            <p className="pt-empty-title">No paints in inventory</p>
            <p className="pt-empty-sub">Add paints here and they'll appear as suggestions in the Paint Tracker editor.</p>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items
              .filter((it) => {
                const q = searchQuery.trim().toLowerCase();
                if (filterCategory !== "all" && (it.category || "").toLowerCase() !== filterCategory) return false;
                if (!q) return true;
                return (`${it.color} ${it.brand} ${it.category || ""}`).toLowerCase().includes(q);
              })
              .map((it) => (
              <li key={it.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}><strong>{it.color}</strong>{it.brand ? ` — ${it.brand}` : ""}</div>
                  {it.category && <div style={{ fontSize: 12, color: "#666" }}>{it.category}</div>}
                </div>
                <button className="pt-remove-collection-btn" onClick={() => removeItem(it.id)}>×</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
