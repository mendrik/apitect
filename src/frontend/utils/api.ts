import { Any, OutputOf } from 'io-ts'

import { failOn } from '../../backend/services/failOn'
import { Login } from '../../backend/types/login'
import { decode } from '../../utils/decode'
import { TUser } from '../types/user'
import { fetchError, FetchError } from './fetchError'

export const apiUrl = (url: string) => `http://localhost:3001/${url}`

const request =
  (method: string) =>
  <P, C extends Any>(url: string, codec: C, body?: P): Promise<OutputOf<C>> =>
    fetch(apiUrl(url), {
      method,
      body: body ? JSON.stringify(body) : null
    })
      .then(failOn<Request>(r => !r.ok, fetchError(`Fetch ${url}`)))
      .then(v => v.json())
      .then(decode(codec))
      .catch((e: FetchError<Request>) => e.data.json())

export const get = request('get')
export const post = request('post')
export const del = request('delete')
export const put = request('put')

export const login = (data: Login) => post('login', TUser, data)
export const whoAmI = () => get('whoami', TUser)
