import { IconAlertCircle } from '@tabler/icons'
import { map, path, range } from 'ramda'
import React, { ReactNode } from 'react'
import {
  ArrayPath,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
  UseFormReturn
} from 'react-hook-form'
import { FormOptions } from '~forms/FormOptions'
import { Jsx } from '~shared/types/generic'

import { Scale, Tuple } from './Tuple'

type OwnProps<T extends FieldValues> = {
  title: (field: FieldArrayWithId<T, ArrayPath<T>>, idx: number) => ReactNode
  name: ArrayPath<T>
  form: UseFormReturn<any>
  selectedName: string
  children: (field: FieldArrayWithId<T, ArrayPath<T>>, idx: number) => ReactNode
}

export const EditableObjectList = <T extends FieldValues>({
  title,
  name,
  selectedName,
  form,
  children
}: Jsx<OwnProps<T>>) => {
  const { fields } = useFieldArray<T>({ name, control: form.control })

  const errors: any[] | undefined = path(name.split('.'), form.formState.errors)

  return (
    <FormOptions name={selectedName} values={map(String, range(0, fields.length))} className="mb-3">
      {fields.map((field, idx) => (
        <div className={'d-grid gap-2'} key={field.id}>
          <label htmlFor={`${selectedName}-${idx}`}>
            <Tuple first={Scale.MAX}>
              <span>{title(field, idx)}</span>
              {errors?.[idx] ? <IconAlertCircle size={18} stroke={1.5} /> : <div />}
            </Tuple>
          </label>
          {children(field, idx)}
        </div>
      ))}
    </FormOptions>
  )
}

type ItemProps = {}

EditableObjectList.Item = ({ children }: Jsx<ItemProps>) => (
  <div className="d-grid gap-2 mb-2">{children}</div>
)
