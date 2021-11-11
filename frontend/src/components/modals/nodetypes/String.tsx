import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../LazyModal'

const String: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>String</div>
}

export default String
