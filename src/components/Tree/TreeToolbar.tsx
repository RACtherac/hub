import { useState } from "react";

interface Props {
  onAddRoot: () => void;

  onImportJson: () => void;
  onExportJson: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function TreeToolbar({
  onAddRoot,
  onImportJson,
  onExportJson,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: Props) {
  const [openMenu, setOpenMenu] = useState<
    "file" | "tree" | null
  >(null);

  function toggle(menu: "file" | "tree") {
    setOpenMenu((prev) =>
      prev === menu ? null : menu
    );
  }

  return (
    <div className="menu-bar">
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => toggle("file")}
        >
          File ▾
        </button>

        {openMenu === "file" && (
          <div className="menu-dropdown">
            <button
              onClick={() => {
                onImportJson();
                setOpenMenu(null);
              }}
            >
              Import JSON
            </button>

            <button
              onClick={() => {
                onExportJson();
                setOpenMenu(null);
              }}
            >
              Export JSON
            </button>
          </div>
        )}
      </div>

      <div className="menu">
        <button
          className="menu-button"
          onClick={onUndo}
          disabled={!canUndo}
        >
          ↶ Undo
        </button>
      </div>

      <div className="menu">
        <button
          className="menu-button"
          onClick={onRedo}
          disabled={!canRedo}
        >
          ↷ Redo
        </button>
      </div>

      <div className="menu">
        <button
          className="menu-button"
          onClick={() => toggle("tree")}
        >
          Tree ▾
        </button>

        {openMenu === "tree" && (
          <div className="menu-dropdown">
            <button
              onClick={() => {
                onAddRoot();
                setOpenMenu(null);
              }}
            >
              Add Root Node
            </button>
          </div>
        )}
      </div>
    </div>
  );
}