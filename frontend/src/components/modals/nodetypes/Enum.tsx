import React from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsProps } from '../NodeSettings'

const Enum: SettingsProps = ({ close }) => {
  const { t } = useTranslation()

  return <div>Enumeration</div>
}

export default Enum
