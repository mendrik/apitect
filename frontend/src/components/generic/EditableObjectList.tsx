import { values } from 'ramda'
import React from 'react'
import {
  ArrayPath,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
  UseFormReturn
} from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import { FormOptions } from '~forms/FormOptions'
import { StringValidationType } from '~shared/types/forms/nodetypes/stringSettings'
import { Jsx } from '~shared/types/generic'

type OwnProps<T extends FieldValues> = {
  title: (field: FieldArrayWithId<T, ArrayPath<T>>, idx: number) => JSX.Element
  name: ArrayPath<T>
  form: UseFormReturn<any>
  children: (field: FieldArrayWithId<T, ArrayPath<T>>, idx: number) => JSX.Element
}

export const EditableObjectList = <T extends FieldValues>({
  title,
  name,
  form,
  children
}: Jsx<OwnProps<T>>) => {
  const { t } = useTranslation()
  const { fields } = useFieldArray<T>({ name, control: form.control })
  return (
    <FormOptions name="validationType" values={values(StringValidationType)} className="mb-3">
      {fields.map((field, idx) => (
        <div className={'d-grid gap-2'}>
          <label htmlFor={`validationType-${StringValidationType.None}`}>{title(field, idx)}</label>
          <div>{children(field, idx)}</div>
        </div>
      ))}
    </FormOptions>
  )
}
