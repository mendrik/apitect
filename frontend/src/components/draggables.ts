import { Pixels } from '../shared/types/generic'

export enum Draggables {
  COLUMN_HEADER = 'COLUMN_HEADER'
}

type HeaderDraggable = {
  type: Draggables.COLUMN_HEADER
  startWidth: Pixels
  index: number
}

export type Draggable = HeaderDraggable
