import { ZUser } from 'shared/types/domain/user'
import { ForgotPassword } from 'shared/types/forms/forgotPassword'
import { Login } from 'shared/types/forms/login'
import { Register } from 'shared/types/forms/register'
import { ZToken } from 'shared/types/response/token'
import { failOn } from 'shared/utils/failOn'
import { safeParseJson, satiated } from 'shared/utils/ramda'
import { ZodSchema } from 'zod'

import { logAndRecover } from '../shared/utils/logAndRecover'
import { fetchError, FetchError } from './fetchError'
import { PromiseCache } from './promiseCache'

export const apiUrl = (url: string) => `http://localhost:3001/${url}`

const request =
  (method: string) =>
  <B, S>(url: string, schema?: ZodSchema<S>, body?: B): Promise<S> =>
    fetch(apiUrl(url), {
      method,
      headers: satiated({
        'content-type': 'application/json; charset=utf-8',
        'x-access-token': safeParseJson(localStorage.getItem('jwt'))
      }),
      body: body ? JSON.stringify(body) : null
    })
      .then(failOn<Request>(r => !r.ok, fetchError(`Fetch ${url}`)))
      .then(v => v.clone().json())
      .then(json => schema?.parse(json) ?? json)
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
export const login = (data: Login) => post('login', ZToken, data)
export const forgotPassword = (data: ForgotPassword) => put('forgot-password', undefined, data)
export const register = (data: Register) => post('register', ZToken, data)

export const whoAmI = () => get('whoami', ZUser)
