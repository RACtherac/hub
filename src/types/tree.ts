export type TreeBlockType =
  | "text"
  | "note"
  | "link"
  | "image"
  | "code";

export interface TreeBlock {
  id: string;

  type: TreeBlockType;

  value: string;

  // Code blocks: the language it's labelled as, e.g. "typescript".
  language?: string;
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