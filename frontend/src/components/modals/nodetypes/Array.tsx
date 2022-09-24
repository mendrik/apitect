import { values } from 'ramda'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FieldSet } from '~forms/FieldSet'
import { FormOptions } from '~forms/FormOptions'
import { TextInput } from '~forms/TextInput'
import { DataSourceType } from '~shared/types/forms/nodetypes/arraySettings'

const Array = () => {
  const { t } = useTranslation()
  const { watch } = useFormContext<Record<string, string>>()

  const selected = watch('dataSource')

  return (
    <FieldSet title="modals.nodeSettings.array.dataSource">
      <FormOptions name="dataSource" values={values(DataSourceType)}>
        <div className="d-grid gap-2">
          <label htmlFor={`dataSource-${DataSourceType.Internal}`}>
            {t('modals.nodeSettings.array.internal.title')}
          </label>
          {selected === DataSourceType.Internal && (
            <TextInput label="form.fields.displayFormat" name="displayFormat" />
          )}
        </div>
        <div className="d-grid gap-2">
          <label htmlFor={`dataSource-${DataSourceType.Database}`}>
            {t('modals.nodeSettings.array.database.title')}
          </label>
          {selected === DataSourceType.Database && (
            <>
              <TextInput label="form.fields.dbUrl" name="dbUrl" />
              <TextInput label="form.fields.dbUser" name="dbUser" autoComplete="off" />
              <TextInput
                label="form.fields.dbPassword"
                type="password"
                name="dbPassword"
                autoComplete="off"
              />
              <TextInput label="form.fields.query" name="query" />
              <TextInput label="form.fields.displayFormat" name="displayFormat" className="mb-2" />
            </>
          )}
        </div>
      </FormOptions>
    </FieldSet>
  )
}

export default Array
