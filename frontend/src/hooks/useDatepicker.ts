import { MouseEvent } from 'react'
import { useFormContext } from 'react-hook-form'

export const useDatepicker = (name: string) => {
  const { watch } = useFormContext<{ [K in typeof name]: Date | undefined }>()
  const date = watch(name)
  return (ev: MouseEvent) => {}
}
