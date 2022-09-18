import { useStore } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '~forms/Checkbox'
import { FieldSet } from '~forms/FieldSet'
import { SelectInput } from '~forms/SelectInput'
import { $enumsStore } from '~stores/$enumsStore'

const Enum = () => {
  const enums = useStore($enumsStore)
  const { t } = useTranslation()

  return (
    <FieldSet title="modals.nodeSettings.validation">
      <SelectInput label="modals.nodeSettings.enums.enumeration" name="enumeration">
        <option value="">{t('common.select')}</option>
        {enums.map(e => (
          <option key={e.name} value={e.name}>
            {e.name}
          </option>
        ))}
      </SelectInput>
      <Checkbox name="required" label={'modals.nodeSettings.required'} />
    </FieldSet>
  )
}

export default Enum
