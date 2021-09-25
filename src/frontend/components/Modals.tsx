import React, { FC } from 'react'

import { LazyModal } from './LazyModal'

export const Modals: FC = () => {
  return <LazyModal from={() => import('./modals/Authenticate')} name="login" />
}
