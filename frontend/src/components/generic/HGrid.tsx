import React, { Children } from 'react'

import { Jsx } from '../../shared/types/generic'

export const HGrid = ({ children }: Jsx) => {
  return (
    <div
      className="d-grid"
      style={{ gridTemplateColumns: `repeat(${Children.count(children)},1fr)` }}
    >
      {children}
    </div>
  )
}
