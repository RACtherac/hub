import { useState } from "react";

interface Props {
  onAddRoot: () => void;

  onImportJson: () => void;
  onExportJson: () => void;
}

export default function TreeToolbar({
  onAddRoot,
  onImportJson,
  onExportJson,
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