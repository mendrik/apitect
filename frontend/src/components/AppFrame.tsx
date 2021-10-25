import React, { FC } from 'react'

export const AppFrame: FC = ({ children }) => {
  return <div className={'bg-light min-vh-100'}>{children}</div>
}
