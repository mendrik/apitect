import React, { FC } from 'react'

import { ReactComponent as LoadingSvg } from '../assets/loader.svg'

export const Loader: FC = () => {
  return (
    <div className="icon">
      <LoadingSvg />
    </div>
  )
}
