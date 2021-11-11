import React from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsProps } from '../NodeSettings'

const Boolean: SettingsProps = ({ close }) => {
  const { t } = useTranslation()

  return <div>Boolean</div>
}

export default Boolean
