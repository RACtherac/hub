export type TreeBlockType =
  | "text"
  | "note"
  | "link"
  | "image";

export interface TreeBlock {
  id: string;

  type: TreeBlockType;

  value: string;
}

export interface TreeNodeData {
  id: string;

  // Sidebar title
  title: string;

  // Large page title
  pageTitle: string;

  collapsed: boolean;

  blocks: TreeBlock[];

  children: TreeNodeData[];
}