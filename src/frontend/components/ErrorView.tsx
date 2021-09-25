import React, { FC } from 'react'

import { ReactComponent as ErrorSvg } from '../assets/error.svg'

export const ErrorView: FC = () => {
  return (
    <div className="w-50 h-50">
      <ErrorSvg />
    </div>
  )
}
