import { repeat } from 'ramda'
import styled from 'styled-components'

import { Palette } from './colors'

export const StyledTreeInput = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;

  &.form-floating > .form-select {
    ~ label {
      opacity: 1;
      transform: none;
    }
    &:not(:empty) ~ label {
      opacity: 0.65;
      transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
    }
  }
`

export const NodeSelector = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  min-height: 100px;
  border: 1px solid ${Palette.border};
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 4px 5px 0px rgba(120, 120, 120, 0.2);
  border-top: 0;
  background-color: white;
`

export const OverlayStub = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`

export const Selected = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  width: 20px;
  min-width: 100%;

  &:focus:before {
    content: none;
  }

  &:not(:empty):focus ~ .delete {
    display: flex;
    top: 20px;
    right: 14px;
  }
`

export const NodeTree = styled.ul`
  list-style: none;
  padding: 0 0.5rem;
  margin: 1rem 0;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`

export const NodeNode = styled.li<{ 'data-depth': number }>`
  padding: 0;
  font-weight: 300;
  color: #666;

  &:hover > * > .name,
  &:focus-within > * > .name {
    font-weight: 400;
  }

  .name {
    padding: 0rem 0.5rem;
  }

  &[data-depth='${props => props['data-depth']}'] {
    & .icn {
      margin-left: ${props => props['data-depth'] - 1}rem;
    }
    background-color: rgb(
      ${props => repeat(Math.max(260 - props['data-depth'] * 5, 200), 3).join(',')}
    );
  }
`
