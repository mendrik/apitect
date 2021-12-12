import { useStore } from 'effector-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SelectInput } from '~forms/SelectInput'
import { $enumsStore } from '~stores/$enumsStore'

const Enum = () => {
  const enums = useStore($enumsStore)
  const { t } = useTranslation()

  return (
    <SelectInput label="modals.nodeSettings.enums.enumeration" name="enumeration">
      <option value="">{t('common.select')}</option>
      {enums.map(e => (
        <option key={e.name} value={e.name}>
          {e.name}
        </option>
      ))}
    </SelectInput>
  )
}

export default Enum
