import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ZodArray, ZodSchema } from 'zod'
import { Jsx } from '~shared/types/generic'

type OwnProps<T> = {
  titleProp: keyof T
  formName: string
  validator: ZodArray<ZodSchema<T>>
  form: UseFormReturn<any>
}

export const EditableObjectList = <T extends any>({
  titleProp,
  formName,
  validator,
  children
}: Jsx<OwnProps<T>>) => {
  return null
}
