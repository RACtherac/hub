export type NodeBlockType =
  | "text"
  | "note"
  | "link"
  | "image";

export interface NodeBlock {
  id: string;
  type: NodeBlockType;
  value: string;
}

export interface TreeNodeData {
  id: string;
  title: string;

  blocks: NodeBlock[];

  collapsed: boolean;
  children: TreeNodeData[];
}