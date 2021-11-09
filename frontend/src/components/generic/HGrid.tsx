import React, { FC, Children } from 'react'

export const HGrid: FC = ({ children }) => {
  return (
    <div
      className="d-grid"
      style={{ gridTemplateColumns: `repeat(${Children.count(children)},1fr)` }}
    >
      {children}
    </div>
  )
}
