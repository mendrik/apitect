import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../LazyModal'

const Object: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Object</div>
}

export default Object