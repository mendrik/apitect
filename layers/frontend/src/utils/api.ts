import { decode } from '@codecs/decode'
import { TUiUser } from '@ui/domain/user'
import { TEmpty } from '@ui/empty'
import { ForgotPassword } from '@ui/forms/forgotPassword'
import { Login } from '@ui/forms/login'
import { Register } from '@ui/forms/register'
import { TToken } from '@ui/response/token'
import { failOn } from '@utils/failOn'
import { safeParse, satiated } from '@utils/ramda'
import { Any, OutputOf } from 'io-ts'
import { always } from 'ramda'

import { fetchError, FetchError } from './fetchError'
import { PromiseCache } from './promiseCache'

export const apiUrl = (url: string) => `http://localhost:3001/${url}`

const request =
  (method: string) =>
  <P, C extends Any>(url: string, codec?: C, body?: P): Promise<OutputOf<C>> =>
    fetch(apiUrl(url), {
      method,
      headers: satiated({
        'content-type': 'application/json; charset=utf-8',
        'x-access-token': safeParse(localStorage.getItem('jwt'))
      }),
      body: body ? JSON.stringify(body) : null
    })
      .then(failOn<Request>(r => !r.ok, fetchError(`Fetch ${url}`)))
      .then(v => v.clone().json())
      .then(json => (codec ? decode(codec)(json) : undefined))
      .catch(async (e: FetchError<Request>) => {
        throw await e.data.json()
      })

const promiseCache = new PromiseCache('100ms')
// const cachedRequest = <T>(req: () => Promise<T>) => promiseCache.get(req, req) as Promise<T>

export const get = request('get')
export const post = request('post')
export const del = request('delete')
export const put = request('put')

export const logout = () => del('logout').then(() => promiseCache.flush())
export const login = (data: Login) => post('login', TToken, data)
export const forgotPassword = (data: ForgotPassword) => put('forgot-password', TEmpty, data)
export const register = (data: Register) => post('register', TToken, data)

export const whoAmI = () => get('whoami', TUiUser).catch(always(null))
