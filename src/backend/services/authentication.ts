import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { constants } from 'http2'
import { sign } from 'jsonwebtoken'
import { assoc, isNil, omit, prop } from 'ramda'

import { promiseFn } from '../../utils/promise'
import { propNotEq } from '../../utils/ramda'
import { PrismaClient } from '../model'
import { httpError } from '../types/HttpError'
import { TLogin } from '../types/login'
import { TRegister } from '../types/register'
import { config } from './config'
import { body, endpoint, user } from './endpoint'
import { failOn } from './failOn'

const client = new PrismaClient()
const pHashSync = promiseFn(hashSync)

const register = endpoint({ register: body(TRegister) }, async ({ register }) => {
  const oldUser = await client.user.findFirst({
    where: { email: register.email }
  })
  if (oldUser != null) {
    throw httpError(constants.HTTP_STATUS_CONFLICT)
  }
  const data = assoc('password', hashSync(register.password, config.PASSWORD_SALT), register)
  const user = await client.user.create({ data })
  const token = sign(`${user.id}`, `${config.TOKEN_KEY}`, { expiresIn: '90d' })
  return client.user.update({ where: { id: user.id }, data: { token } }).then(prop('email'))
})

const login = endpoint({ login: body(TLogin) }, ({ login: { email, password } }) =>
  pHashSync(password, config.PASSWORD_SALT).then(encryptedPassword =>
    client.user
      .findFirst({ where: { email } })
      .then(failOn(isNil, httpError(404)))
      .then(
        failOn(propNotEq('password', encryptedPassword), httpError(403, `Password doesn't match`))
      )
      .then(omit(['password', 'id']))
  )
)

const whomAmI = endpoint({ user }, async ({ user }) => user)

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', register)
  fastify.post('/login', login)
  fastify.get('/whomAmI', whomAmI)
}
