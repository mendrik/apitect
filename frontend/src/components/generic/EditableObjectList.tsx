import { map, range } from 'ramda'
import React from 'react'
import {
  ArrayPath,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
  UseFormReturn
} from 'react-hook-form'
import { FormOptions } from '~forms/FormOptions'
import { Jsx } from '~shared/types/generic'

type OwnProps<T extends FieldValues> = {
  title: (field: FieldArrayWithId<T, ArrayPath<T>>, idx: number) => JSX.Element
  name: ArrayPath<T>
  form: UseFormReturn<any>
  selectedName: string
  children: (field: FieldArrayWithId<T, ArrayPath<T>>, idx: number) => JSX.Element
}

export const EditableObjectList = <T extends FieldValues>({
  title,
  name,
  selectedName,
  form,
  children
}: Jsx<OwnProps<T>>) => {
  const { fields } = useFieldArray<T>({ name, control: form.control })
  return (
    <FormOptions name={selectedName} values={map(String, range(0, fields.length))} className="mb-3">
      {fields.map((field, idx) => (
        <div className={'d-grid gap-2'} key={field.id}>
          <label htmlFor={`${selectedName}-${idx}`}>{title(field, idx)}</label>
          <div>{children(field, idx)}</div>
        </div>
      ))}
    </FormOptions>
  )
}
