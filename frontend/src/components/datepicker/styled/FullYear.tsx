import { propOr } from 'ramda'
import styled from 'styled-components'

import { Palette } from '../../../css/colors'

export const FullYear = styled.ol`
  margin: 0;
  padding: 0;
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(12, 1fr);
  margin: 0 auto;

  @media only screen and (min-width: 560px) {
    align-items: flex-start;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 1fr);
  }

  @media only screen and (min-width: 769px) {
    max-width: 1024px;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media only screen and (min-width: 1380px) {
    max-width: 1400px;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
  }

  .day[data-date='${propOr('', 'data-selected')}'] {
    background-color: ${Palette.selected};
    font-weight: 600;
    border-radius: 4px;
  }

  .day[data-date='${propOr('', 'data-today')}'] {
    color: #aa0000;
    font-weight: 600;
  }

  > li {
    padding: 0 1rem 1.5rem 1rem;
  }
`
