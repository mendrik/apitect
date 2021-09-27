import React, { FC } from 'react'

export const ButtonRow: FC = ({ children }) => (
  <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">{children}</div>
)
