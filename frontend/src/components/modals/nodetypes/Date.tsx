import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../LazyModal'

const Date: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Date</div>
}

export default Date
