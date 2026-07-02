import { useState } from "react";
import {
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import type { TreeNodeData } from "../../types/tree";

interface Props {
  node: TreeNodeData;

  selectedId: string | null;
  onSelect: (id: string) => void;

  activeOverId: string | null;
  dropPosition: "above" | "inside" | "below";

  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;

  onAddChild: (parentId: string) => void;
}

export default function TreeNode({
  node,
  selectedId,
  onSelect,
  activeOverId,
  dropPosition,
  onToggle,
  onDelete,
  onRename,
  onAddChild,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(node.title);

  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
  } = useDraggable({
    id: node.id,
  });

  const { setNodeRef: setDropRef } =
    useDroppable({
      id: node.id,
    });

  const isActiveOver = activeOverId === node.id;

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setDropRef}>
      {isActiveOver &&
        dropPosition === "above" && (
          <div className="drop-line" />
        )}

      <div
        ref={setNodeRef}
        style={style}
        className={`tree-node
          ${isActiveOver ? "active-over" : ""}
          ${
            selectedId === node.id
              ? "selected"
              : ""
          }`}
      >
        <span
          {...listeners}
          {...attributes}
          className="tree-drag"
        >
          ⠿
        </span>

        <button
          onClick={() => onToggle(node.id)}
        >
          {node.collapsed ? "▶" : "▼"}
        </button>

        {editing ? (
          <input
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            onBlur={() => {
              onRename(node.id, value);
              setEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onRename(node.id, value);
                setEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span
            className="tree-title"
            onClick={() =>
              onSelect(node.id)
            }
            onDoubleClick={() =>
              setEditing(true)
            }
          >
            {node.title}
          </span>
        )}

      <div className="tree-actions">
  <button
    className="tree-add"
    title="Add Child"
    onClick={() =>
      onAddChild(node.id)
    }
  >
    ＋
  </button>

  <button
    title="Rename"
    onClick={() =>
      setEditing(true)
    }
  >
    ✎
  </button>

  <button
    className="tree-delete"
    title="Delete"
    onClick={() =>
      onDelete(node.id)
    }
  >
    🗑
  </button>
</div>
      </div>

      {isActiveOver &&
        dropPosition === "inside" && (
          <div className="drop-inside" />
        )}

      {!node.collapsed && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              activeOverId={activeOverId}
              dropPosition={dropPosition}
              onToggle={onToggle}
              onDelete={onDelete}
              onRename={onRename}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}

      {isActiveOver &&
        dropPosition === "below" && (
          <div className="drop-line" />
        )}
    </div>
  );
}