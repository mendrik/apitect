import * as t from 'io-ts'
import { curry } from 'ramda'

import { decode } from '../../utils/decode'
import { TUser } from '../types/user'

export const apiUrl = (url: string) => `http://localhost:3001/${url}`

const request = curry(
  <P>(method: string, url: string, codec: t.Any, body?: P): Promise<t.OutputOf<typeof codec>> =>
    fetch(apiUrl(url), {
      method,
      body: body ? JSON.stringify(body) : null
    })
      .then(v => v.json())
      .then(decode(codec))
)

const get = request('get')
/*
const post = request('post')
const del = request('delete')
const put = request('put')
*/

export const login = get('login', TUser)
