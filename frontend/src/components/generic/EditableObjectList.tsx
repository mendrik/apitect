import { IconAlertCircle } from '@tabler/icons'
import { map, path, range } from 'ramda'
import { MutableRefObject, ReactNode } from 'react'
import {
  ArrayPath,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
  UseFormReturn
} from 'react-hook-form'
import { useEvent } from 'react-use'
import { FormOptions } from '~forms/FormOptions'
// import { useEvent } from '~hooks/useEvent'
import { Jsx } from '~shared/types/generic'
import { asNumber } from '~shared/utils/ramda'

import { Scale, Tuple } from './Tuple'

type OwnProps<T extends FieldValues> = {
  title: (field: FieldArrayWithId<T, ArrayPath<T>>, idx: number) => ReactNode
  name: ArrayPath<T>
  form: UseFormReturn<any>
  selectedName?: string
  deleteButtonRef: MutableRefObject<HTMLElement | null>
  children: (field: FieldArrayWithId<T, ArrayPath<T>>, idx: number) => JSX.Element
}

export const EditableObjectList = <T extends FieldValues>({
  title,
  name,
  selectedName = 'selection',
  form,
  deleteButtonRef,
  children
}: OwnProps<T>) => {
  const { fields, remove } = useFieldArray<T>({ name, control: form.control })

  const errors: any[] | undefined = path(name.split('.'), form.formState.errors)
  const selected = asNumber(form.watch(selectedName))
  const onDelete = () => {
    form.setValue(selectedName, undefined)
    remove(selected)
  }

  useEvent('click', onDelete, deleteButtonRef.current)

  return (
    <FormOptions name={selectedName} values={map(String, range(0, fields.length))} className="mb-3">
      {fields.map((field, idx) => (
        <div className={'d-grid gap-2'} key={field.id}>
          <label htmlFor={`${selectedName}-${idx}`}>
            <Tuple first={Scale.MAX}>
              <span>{title(field, idx)}</span>
              {errors?.[idx] && selected !== idx ? (
                <IconAlertCircle size={18} stroke={1.5} />
              ) : (
                <div />
              )}
            </Tuple>
          </label>
          {selected === idx && children(field, idx)}
        </div>
      ))}
    </FormOptions>
  )
}

EditableObjectList.Item = ({ children }: Jsx): JSX.Element => (
  <div className="d-grid gap-2 mb-2">{children}</div>
)
