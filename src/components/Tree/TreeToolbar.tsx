import { useState } from "react";

interface Props {
  onAddRoot: () => void;

  onImportJson: () => void;
  onExportJson: () => void;

  onImportImages: () => void;
}

export default function TreeToolbar({
  onAddRoot,
  onImportJson,
  onExportJson,
  onImportImages,
}: Props) {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  function toggleMenu(menu: string) {
    setOpenMenu((prev) =>
      prev === menu ? null : menu
    );
  }

  return (
    <div className="menu-bar">
      {/* FILE */}
      <div className="menu">
        <button
          className="menu-trigger"
          onClick={() =>
            toggleMenu("file")
          }
        >
          File ▼
        </button>

        {openMenu === "file" && (
          <div className="menu-dropdown">
            <button
              onClick={() => {
                onAddRoot();
                setOpenMenu(null);
              }}
            >
              New Node
            </button>

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

      {/* IMAGES */}
      <div className="menu">
        <button
          className="menu-trigger"
          onClick={() =>
            toggleMenu("images")
          }
        >
          Images ▼
        </button>

        {openMenu === "images" && (
          <div className="menu-dropdown">
            <button
              onClick={() => {
                onImportImages();
                setOpenMenu(null);
              }}
            >
              Import Images
            </button>
          </div>
        )}
      </div>

      {/* TREE */}
      <div className="menu">
        <button
          className="menu-trigger"
          onClick={() =>
            toggleMenu("tree")
          }
        >
          Tree ▼
        </button>

        {openMenu === "tree" && (
          <div className="menu-dropdown">
            <button disabled>
              Expand All
            </button>

            <button disabled>
              Collapse All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}