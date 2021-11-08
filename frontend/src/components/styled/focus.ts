import styled, { AnyStyledComponent } from 'styled-components'

export const focus = <C extends AnyStyledComponent>(component: C) => styled(component)`
  border: 1px dotted transparent;
  &:focus {
    border: 1px dotted #999;
    outline: none;
    border-radius: 2px;
`
