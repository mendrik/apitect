import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../LazyModal'

const RichText: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>RichText</div>
}

export default RichText
