import { useStore } from 'effector-react'
import { prop, values } from 'ramda'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FieldSet } from '~forms/FieldSet'
import { FormOptions } from '~forms/FormOptions'
import { TextInput } from '~forms/TextInput'
import { TreeInput } from '~forms/TreeInput'
import { DataSource } from '~shared/types/forms/nodetypes/arraySettings'
import { $selectedArrayNode } from '~stores/$arrayStores'

const Array = () => {
  const { t } = useTranslation()
  const tree = useStore($selectedArrayNode)
  const { watch } = useFormContext<Record<string, string>>()

  const selected = watch('dataSource')

  return (
    <FieldSet title="modals.nodeSettings.array.dataSource">
      <FormOptions name="dataSource" values={values(DataSource)}>
        <div className="d-grid gap-2">
          <label htmlFor={`dataSource-${DataSource.Internal}`}>
            {t('modals.nodeSettings.array.internal.title')}
          </label>
          {selected === DataSource.Internal && (
            <TreeInput
              tree={tree!}
              containerClasses="pb-2"
              label="form.fields.displayNode"
              name="displayNode"
              nodeRender={prop('name')}
            />
          )}
        </div>
        <div className="d-grid gap-2">
          <label htmlFor={`dataSource-${DataSource.Database}`}>
            {t('modals.nodeSettings.array.database.title')}
          </label>
          {selected === DataSource.Database && (
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
              <TextInput label="form.fields.displayColumn" name="displayColumn" className="pb-2" />
            </>
          )}
        </div>
      </FormOptions>
    </FieldSet>
  )
}

export default Array
