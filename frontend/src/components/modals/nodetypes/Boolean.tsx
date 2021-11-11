import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../LazyModal'

const Boolean: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Boolean</div>
}

export default Boolean
