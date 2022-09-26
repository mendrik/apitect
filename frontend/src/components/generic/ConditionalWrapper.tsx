import { ReactElement } from 'react'
import { Jsx } from '~shared/types/generic'

type OwnProps = {
  condition: boolean
  wrapper: (props: Jsx) => ReactElement | null
  children: ReactElement
}

export const ConditionalWrapper = ({ condition, wrapper, children }: Jsx<OwnProps>) =>
  condition ? wrapper({ children }) : children
