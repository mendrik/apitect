import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../ModalStub'

const Enum: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Enumeration</div>
}

export default Enum
