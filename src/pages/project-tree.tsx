import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../components/styles/tree.css";

import Tree from "../components/Tree/Tree";
import TreeToolbar from "../components/Tree/TreeToolbar";

import type { TreeNodeData } from "../types/tree";

import {
  addNode,
  deleteNode,
  toggleNode,
  renameNode,
} from "../utils/treeUtils";

import { moveTreeNode } from "../utils/treeNotionMove";

function createNode(title: string): TreeNodeData {
  return {
    id: crypto.randomUUID(),
    title,

    blocks: [],

    collapsed: false,
    children: [],
  };
}

const initialTree: TreeNodeData = {
  id: "root",
  title: "Project Tree",

  blocks: [],

  collapsed: false,
  children: [],
};

function findNode(
  node: TreeNodeData,
  id: string
): TreeNodeData | null {
  if (node.id === id) return node;

  for (const child of node.children) {
    const found = findNode(child, id);

    if (found) return found;
  }

  return null;
}

function addBlock(
  tree: TreeNodeData,
  nodeId: string,
  type: "text" | "note" | "link" | "image"
): TreeNodeData {
  if (tree.id === nodeId) {
    return {
      ...tree,
      blocks: [
        ...tree.blocks,
        {
          id: crypto.randomUUID(),
          type,
          value: "",
        },
      ],
    };
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      addBlock(child, nodeId, type)
    ),
  };
}

function updateBlock(
  tree: TreeNodeData,
  nodeId: string,
  blockId: string,
  value: string
): TreeNodeData {
  if (tree.id === nodeId) {
    return {
      ...tree,
      blocks: tree.blocks.map((block) =>
        block.id === blockId
          ? { ...block, value }
          : block
      ),
    };
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      updateBlock(
        child,
        nodeId,
        blockId,
        value
      )
    ),
  };
}

export default function ProjectTree() {
  const navigate = useNavigate();

  const [tree, setTree] =
    useState<TreeNodeData>(initialTree);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const jsonInputRef =
    useRef<HTMLInputElement>(null);

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const selectedNode = selectedId
    ? findNode(tree, selectedId)
    : null;

  function exportJson() {
    const blob = new Blob(
      [JSON.stringify(tree, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "project-tree.json";

    a.click();

    URL.revokeObjectURL(url);
  }

  function importJson(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(
          reader.result as string
        );

        setTree(parsed);
      } catch {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  }

  function importImages(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = event.target.files;

    if (!files) return;

    console.log(
      "Imported images:",
      files
    );
  }

  return (
    <div className="pt-page">
      <header className="pt-topbar">
        <button
          className="pt-back"
          onClick={() => navigate("/")}
        >
          ← OH<span>/</span>Hub
        </button>

        <h1>Project Tree</h1>
      </header>

      <div className="pt-workspace">
        <aside className="pt-sidebar">
          <TreeToolbar
            onAddRoot={() =>
              setTree((prev) =>
                addNode(
                  prev,
                  "root",
                  createNode("New Node")
                )
              )
            }
            onImportJson={() =>
              jsonInputRef.current?.click()
            }
            onExportJson={exportJson}
            onImportImages={() =>
              imageInputRef.current?.click()
            }
          />

          <Tree
            tree={tree}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onMove={(activeId, overId) =>
              setTree((prev) =>
                moveTreeNode(
                  prev,
                  activeId,
                  overId
                )
              )
            }
            onToggle={(id) =>
              setTree((prev) =>
                toggleNode(prev, id)
              )
            }
            onDelete={(id) =>
              setTree((prev) =>
                deleteNode(prev, id)
              )
            }
            onRename={(id, title) =>
              setTree((prev) =>
                renameNode(
                  prev,
                  id,
                  title
                )
              )
            }
            onAddChild={(parentId) =>
              setTree((prev) =>
                addNode(
                  prev,
                  parentId,
                  createNode("New Node")
                )
              )
            }
          />
        </aside>

        <main className="pt-editor">
          {selectedNode ? (
            <>
              <h2>
                {selectedNode.title}
              </h2>

              <div className="block-toolbar">
                <button
                  onClick={() =>
                    setTree((prev) =>
                      addBlock(
                        prev,
                        selectedNode.id,
                        "text"
                      )
                    )
                  }
                >
                  + Text
                </button>

                <button
                  onClick={() =>
                    setTree((prev) =>
                      addBlock(
                        prev,
                        selectedNode.id,
                        "note"
                      )
                    )
                  }
                >
                  + Note
                </button>

                <button
                  onClick={() =>
                    setTree((prev) =>
                      addBlock(
                        prev,
                        selectedNode.id,
                        "link"
                      )
                    )
                  }
                >
                  + Link
                </button>

                <button
                  onClick={() =>
                    setTree((prev) =>
                      addBlock(
                        prev,
                        selectedNode.id,
                        "image"
                      )
                    )
                  }
                >
                  + Image
                </button>
              </div>

              <div className="node-blocks">
                {selectedNode.blocks.map(
                  (block) => (
                    <div
                      key={block.id}
                      className="node-block"
                    >
                      <div className="node-block-header">
                        {block.type.toUpperCase()}
                      </div>

                      <textarea
                        value={block.value}
                        onChange={(e) =>
                          setTree((prev) =>
                            updateBlock(
                              prev,
                              selectedNode.id,
                              block.id,
                              e.target.value
                            )
                          )
                        }
                        placeholder={`Enter ${block.type}...`}
                      />
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="pt-empty">
              Select a node from the tree.
            </div>
          )}
        </main>
      </div>

      <input
        ref={jsonInputRef}
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={importJson}
      />

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={importImages}
      />
    </div>
  );
}