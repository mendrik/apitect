import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export const useAutoFocus = (name: string, autoFocus = false) => {
  const { setFocus } = useFormContext()

  useEffect(() => {
    if (autoFocus) {
      setFocus(name)
    }
  }, [setFocus, autoFocus, name])
}
