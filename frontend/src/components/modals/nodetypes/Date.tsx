import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../ModalStub'

const Date: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Date</div>
}

export default Date
