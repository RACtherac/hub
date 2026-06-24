import type { TreeNodeData } from "../types/tree";

export function toggleNode(tree: TreeNodeData, id: string): TreeNodeData {
  if (tree.id === id) {
    return { ...tree, collapsed: !tree.collapsed };
  }

  return {
    ...tree,
    children: tree.children.map((c) => toggleNode(c, id)),
  };
}

export function renameNode(
  tree: TreeNodeData,
  id: string,
  title: string
): TreeNodeData {
  if (tree.id === id) {
    return { ...tree, title };
  }

  return {
    ...tree,
    children: tree.children.map((c) => renameNode(c, id, title)),
  };
}

export function deleteNode(
  tree: TreeNodeData,
  id: string
): TreeNodeData {
  return {
    ...tree,
    children: tree.children
      .filter((c) => c.id !== id)
      .map((c) => deleteNode(c, id)),
  };
}

export function addNode(
  tree: TreeNodeData,
  parentId: string,
  newNode: TreeNodeData
): TreeNodeData {
  if (tree.id === parentId) {
    return {
      ...tree,
      children: [...tree.children, newNode],
    };
  }

  return {
    ...tree,
    children: tree.children.map((c) =>
      addNode(c, parentId, newNode)
    ),
  };
}