export enum Draggables {
  COLUMN_HEADER = 'COLUMN_HEADER',
  TREE_NODE = 'COLUMN_HEADER'
}

type HeaderDraggable = {
  type: Draggables.COLUMN_HEADER
  index: number
  nextWidth: number
  startWidth: number
}

export type Draggable = HeaderDraggable
