import React from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsProps } from '../NodeSettings'

const RichText: SettingsProps = ({ close }) => {
  const { t } = useTranslation()

  return <div>RichText</div>
}

export default RichText
