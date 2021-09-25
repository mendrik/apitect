import { useNavigate } from 'react-router-dom'
import { useReadLocalStorage } from 'usehooks-ts'

import { Maybe } from '../../utils/maybe'
import { addParams } from '../../utils/url'
import { User } from '../types/user'
import { whoami } from '../utils/api'
import useInstantPromise from './useInstantPromise'
import { State } from './usePromise'

export const useRequireLogin = (): State<User> => {
  const jwt: Maybe<string> = useReadLocalStorage('jwt')
  const navigate = useNavigate()
  if (jwt == null) {
    void navigate(addParams({ modal: 'login' }))
  }
  const state = useInstantPromise('whoami', whoami)
  if (state.error) {
    throw Promise.resolve('failed to load user')
  }
  return state
}
