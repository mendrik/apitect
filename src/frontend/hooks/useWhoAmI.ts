import { useReadLocalStorage } from 'usehooks-ts'

import { Maybe } from '../../utils/maybe'
import { User } from '../types/user'
import { whoAmI } from '../utils/api'
import useInstantPromise from './useInstantPromise'
import { State } from './usePromise'

export const useWhoAmI = (): State<Maybe<User>> => {
  const jwt: Maybe<string> = useReadLocalStorage('jwt')
  const state = useInstantPromise('whoAmI', whoAmI, () => jwt != null)
  if (state.error) {
    throw Error('Failed to load user')
  }
  if (state.status === 'running') {
    throw Promise.resolve('Loading user')
  }
  return state
}
