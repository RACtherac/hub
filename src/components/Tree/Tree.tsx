import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";

import type { TreeNodeData } from "../../types/tree";

import TreeNode from "./TreeNode";

interface Props {
  tree: TreeNodeData;

  selectedId: string | null;

  onSelect: (id: string) => void;

  onMove: (
    activeId: string,
    overId: string
  ) => void;

  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (
    id: string,
    title: string
  ) => void;

  onAddChild: (
    parentId: string
  ) => void;
}

export default function Tree({
  tree,
  selectedId,
  onSelect,
  onMove,
  onToggle,
  onDelete,
  onRename,
  onAddChild,
}: Props) {
  function handleDragEnd(
    event: DragEndEvent
  ) {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    onMove(
      String(active.id),
      String(over.id)
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="tree">
        {tree.children.length === 0 && (
          <div className="tree-empty">
            Create your first node.
          </div>
        )}

        {tree.children.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            selectedId={selectedId}
            onSelect={onSelect}
            activeOverId={null}
            dropPosition="above"
            onToggle={onToggle}
            onDelete={onDelete}
            onRename={onRename}
            onAddChild={onAddChild}
          />
        ))}
      </div>
    </DndContext>
  );
}