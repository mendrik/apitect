import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../LazyModal'

const Location: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Location</div>
}

export default Location
