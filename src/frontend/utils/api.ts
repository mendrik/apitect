import { Any, OutputOf } from 'io-ts'

import { Login } from '../../backend/types/login'
import { Register } from '../../backend/types/register'
import { decode } from '../../utils/codecs/decode'
import { failOn } from '../../utils/failOn'
import { TToken } from '../types/token'
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
      .then(v => v.clone().json())
      .then(decode(codec))
      .catch(async (e: FetchError<Request>) => {
        throw await e.data.json()
      })

export const get = request('get')
export const post = request('post')
export const del = request('delete')
export const put = request('put')

export const login = (data: Login) => post('login', TToken, data)
export const register = (data: Register) => post('register', TToken, data)
export const whoAmI = () => get('whoami', TUser)
