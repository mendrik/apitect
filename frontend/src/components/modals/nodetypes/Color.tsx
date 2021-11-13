import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../ModalStub'

const Color: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Color</div>
}

export default Color
