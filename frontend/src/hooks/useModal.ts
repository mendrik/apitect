import { useStore } from 'effector-react'
import { $modalStore } from '~stores/$modalStore'

export const useModal = <T>(): T => {
  const modal = useStore($modalStore)
  return modal?.params as T
}
