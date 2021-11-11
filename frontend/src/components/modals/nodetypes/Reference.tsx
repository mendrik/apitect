import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../LazyModal'

const Reference: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Reference</div>
}

export default Reference
