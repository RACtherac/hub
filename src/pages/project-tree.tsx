import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../components/styles/tree.css";

import Tree from "../components/Tree/Tree";
import TreeToolbar from "../components/Tree/TreeToolbar";

import type {
  TreeNodeData,
  TreeBlock,
  TreeBlockType,
} from "../types/tree";

import {
  addNode,
  deleteNode,
  renameNode,
  toggleNode,
} from "../utils/treeUtils";

import { moveTreeNode } from "../utils/treeNotionMove";

function createNode(title: string): TreeNodeData {
  return {
    id: crypto.randomUUID(),

    title,

    pageTitle: title,

    blocks: [],

    collapsed: false,

    children: [],
  };
}

const initialTree: TreeNodeData = {
  id: "root",

  title: "Project Tree",

  pageTitle: "Project Tree",

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
  type: TreeBlockType
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
          ? {
              ...block,
              value,
            }
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

function deleteBlock(
  tree: TreeNodeData,
  nodeId: string,
  blockId: string
): TreeNodeData {
  if (tree.id === nodeId) {
    return {
      ...tree,
      blocks: tree.blocks.filter(
        (b) => b.id !== blockId
      ),
    };
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      deleteBlock(child, nodeId, blockId)
    ),
  };
}

function duplicateBlock(
  tree: TreeNodeData,
  nodeId: string,
  blockId: string
): TreeNodeData {
  if (tree.id === nodeId) {
    const blocks: TreeBlock[] = [];

    tree.blocks.forEach((block) => {
      blocks.push(block);

      if (block.id === blockId) {
        blocks.push({
          ...block,
          id: crypto.randomUUID(),
        });
      }
    });

    return {
      ...tree,
      blocks,
    };
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      duplicateBlock(
        child,
        nodeId,
        blockId
      )
    ),
  };
}

function moveBlock(
  tree: TreeNodeData,
  nodeId: string,
  blockId: string,
  direction: "up" | "down"
): TreeNodeData {
  if (tree.id === nodeId) {
    const blocks = [...tree.blocks];

    const index = blocks.findIndex(
      (b) => b.id === blockId
    );

    if (index === -1) return tree;

    const target =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      target < 0 ||
      target >= blocks.length
    )
      return tree;

    [blocks[index], blocks[target]] = [
      blocks[target],
      blocks[index],
    ];

    return {
      ...tree,
      blocks,
    };
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      moveBlock(
        child,
        nodeId,
        blockId,
        direction
      )
    ),
  };
}

export default function ProjectTree() {
  const navigate = useNavigate();

  const [tree, setTree] =
    useState(initialTree);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const jsonInputRef =
    useRef<HTMLInputElement>(null);

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const [imageTarget, setImageTarget] =
    useState<string | null>(null);

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
        setTree(
          JSON.parse(
            reader.result as string
          )
        );
      } catch {
        alert("Invalid JSON");
      }
    };

    reader.readAsText(file);
  }

  function importImage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (
      !imageTarget ||
      !selectedNode
    )
      return;

    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setTree((prev) =>
        updateBlock(
          prev,
          selectedNode.id,
          imageTarget,
          reader.result as string
        )
      );
    };

    reader.readAsDataURL(file);
  }
  function updatePageTitle(
  tree: TreeNodeData,
  id: string,
  pageTitle: string
): TreeNodeData {
  if (tree.id === id) {
    return {
      ...tree,
      pageTitle,
    };
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      updatePageTitle(child, id, pageTitle)
    ),
  };
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
                renameNode(prev, id, title)
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
<input
    className="page-title-input"
    value={selectedNode.pageTitle}
    onChange={(e)=>
        setTree(prev =>
            updatePageTitle(
                prev,
                selectedNode.id,
                e.target.value
            )
        )
    }
/>              <div className="block-toolbar">
                <button
                  className="block-add-button"
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
                  <span>📝</span>

                 <div className="block-add-info">
    <strong>Text</strong>
    <small>Paragraph</small>
</div>
                </button>

                <button
                  className="block-add-button"
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
                  <span>📒</span>

                  <div>
                    <strong>Note</strong>
                    <small>Large note</small>
                  </div>
                </button>

                <button
                  className="block-add-button"
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
                  <span>🔗</span>

                  <div>
                    <strong>Link</strong>
                    <small>Website</small>
                  </div>
                </button>

                <button
                  className="block-add-button"
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
                  <span>🖼</span>

                  <div className="block-add-info">
    <strong>Image</strong>
    <small>Upload image</small>
</div>
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
                        <span>
                          {block.type.toUpperCase()}
                        </span>

                        <div className="block-actions">
                          <button
                            title="Duplicate"
                            onClick={() =>
                              setTree((prev) =>
                                duplicateBlock(
                                  prev,
                                  selectedNode.id,
                                  block.id
                                )
                              )
                            }
                          >
                            📄
                          </button>

                          <button
                            title="Move Up"
                            onClick={() =>
                              setTree((prev) =>
                                moveBlock(
                                  prev,
                                  selectedNode.id,
                                  block.id,
                                  "up"
                                )
                              )
                            }
                          >
                            ↑
                          </button>

                          <button
                            title="Move Down"
                            onClick={() =>
                              setTree((prev) =>
                                moveBlock(
                                  prev,
                                  selectedNode.id,
                                  block.id,
                                  "down"
                                )
                              )
                            }
                          >
                            ↓
                          </button>

                          <button
                            className="danger"
                            title="Delete"
                            onClick={() =>
                              setTree((prev) =>
                                deleteBlock(
                                  prev,
                                  selectedNode.id,
                                  block.id
                                )
                              )
                            }
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                                            {block.type === "text" && (
                        <textarea
                          className="block-text"
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
                          placeholder="Write some text..."
                        />
                      )}

                      {block.type === "note" && (
                        <textarea
                          className="block-note"
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
                          placeholder="Detailed notes..."
                        />
                      )}

                      {block.type === "link" && (
                        <input
                          className="block-link"
                          type="text"
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
                          placeholder="https://example.com"
                        />
                      )}

                      {block.type === "image" && (
                        <div className="image-block">
                          {block.value ? (
                            <>
                             <img
    src={block.value}
    alt="Uploaded"
    className="node-image-preview"
/>

                              <div className="image-buttons">
                                <button
                                  onClick={() => {
                                    setImageTarget(block.id);
                                    imageInputRef.current?.click();
                                  }}
                                >
                                  Update Image
                                </button>

                                <button
                                  className="danger"
                                  onClick={() =>
                                    setTree((prev) =>
                                      updateBlock(
                                        prev,
                                        selectedNode.id,
                                        block.id,
                                        ""
                                      )
                                    )
                                  }
                                >
                                  Remove Image
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="image-upload-card">
                              <div className="image-upload-icon">
                                🖼
                              </div>

                              <h3>No image selected</h3>

                              <p>
                                Click below to upload an image.
                              </p>

                             <button
  className="image-upload-button"
  onClick={() => {
    setImageTarget(block.id);
    imageInputRef.current?.click();
  }}
>
  🖼 Update Image
</button>
                            </div>
                          )}
                        </div>
                      )}
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
        style={{ display: "none" }}
        onChange={importImage}
      />
    </div>
  );
}