import { Pixels } from '../shared/types/generic'

export enum Draggables {
  COLUMN_HEADER = 'COLUMN_HEADER'
}

type HeaderDraggable = {
  type: Draggables.COLUMN_HEADER
  index: number
  nextWidth: number
}

export type Draggable = HeaderDraggable
