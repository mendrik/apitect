import { mapIndexed } from 'ramda-adjunct'
import styled from 'styled-components'

export const StyledGrid = styled.div<{ columns: any[]; defaultWidths?: number[] }>`
  --selectedRow: -5;
  display: grid;
  width: 100%;
  grid-template-columns: ${({ columns, defaultWidths }) =>
    mapIndexed((_, i) => `minmax(auto, var(--col-width-${i}, ${defaultWidths?.[i] ?? 1}fr)) `)(
      columns
    )};
  grid-template-rows: 32px;
  grid-auto-rows: auto;

  &:before {
    content: '';
    position: absolute;
    background-color: #f0f7df;
    height: 24px;
    left: 0;
    right: 0;
    top: calc(32px + 0.5rem + var(--selectedRow) * 24px);
    z-index: -1;
  }
`
