import type { TreeNodeData } from "../types/tree";

function removeNode(
  node: TreeNodeData,
  id: string
): [TreeNodeData, TreeNodeData | null] {
  let removed: TreeNodeData | null = null;

  const newNode: TreeNodeData = {
    ...node,
    children: node.children
      .filter((child) => {
        if (child.id === id) {
          removed = child;
          return false;
        }
        return true;
      })
      .map((child) => removeNode(child, id)[0]),
  };

  return [newNode, removed];
}

function insertInside(
  node: TreeNodeData,
  targetId: string,
  insertNode: TreeNodeData
): TreeNodeData {
  if (node.id === targetId) {
    return {
      ...node,
      collapsed: false,
      children: [...node.children, insertNode],
    };
  }

  return {
    ...node,
    children: node.children.map((child) =>
      insertInside(child, targetId, insertNode)
    ),
  };
}

/**
 * ✅ SINGLE MOVE FUNCTION (USE THIS EVERYWHERE)
 */
export function moveTreeNode(
  tree: TreeNodeData,
  activeId: string,
  overId: string
): TreeNodeData {
  if (activeId === overId) return tree;

  const [without, removed] = removeNode(tree, activeId);

  if (!removed) return tree;

  return insertInside(without, overId, removed);
}