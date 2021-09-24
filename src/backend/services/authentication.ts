import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { assoc, isNil, omit } from 'ramda'

import { propNotEq } from '../../utils/ramda'
import { PrismaClient } from '../model'
import { TLogin } from '../types/login'
import { TRegister } from '../types/register'
import { config } from './config'
import { body, endpoint, user } from './endpoint'
import { failOn } from './failOn'

const client = new PrismaClient()

const register = endpoint({ register: body(TRegister) }, async ({ register }, { OK, CONFLICT }) => {
  const oldUser = await client.user.findFirst({
    where: { email: register.email }
  })
  if (oldUser != null) {
    return CONFLICT()
  }
  const data = assoc('password', hashSync(register.password, config.PASSWORD_SALT), register)
  const user = await client.user.create({ data })
  const token = sign(`${user.id}`, `${config.TOKEN_KEY}`, { expiresIn: '90d' })
  await client.user.update({ where: { id: user.id }, data: { token } })
  return OK({ status: `${user.email} created` })
})

const login = endpoint(
  { login: body(TLogin) },
  async ({ login: { email, password } }, { OK, FORBIDDEN }) => {
    try {
      const encryptedPassword = hashSync(password, config.PASSWORD_SALT)
      return client.user
        .findFirst({ where: { email } })
        .then(failOn(isNil, 'User not found'))
        .then(failOn(propNotEq('password', encryptedPassword), `password don't match`))
        .then(omit(['password', 'id']))
        .then(OK)
    } catch (e) {
      return FORBIDDEN()
    }
  }
)

const whoami = endpoint({ user }, async ({ user }, { OK }) => OK(user))

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', register)
  fastify.post('/login', login)
  fastify.get('/whoami', whoami)
}
