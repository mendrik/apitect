import React from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsProps } from '../NodeSettings'

const Number: SettingsProps = ({ close }) => {
  const { t } = useTranslation()

  return <div>Number</div>
}

export default Number
