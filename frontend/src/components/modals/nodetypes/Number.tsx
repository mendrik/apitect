import React from 'react'
import { useTranslation } from 'react-i18next'

import { ModalFC } from '../../ModalStub'

const Number: ModalFC = ({ close }) => {
  const { t } = useTranslation()

  return <div>Number</div>
}

export default Number
