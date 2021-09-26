import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { assoc, isNil, omit, prop, propEq } from 'ramda'

import { failOn, failUnless } from '../../utils/failOn'
import { promiseFn } from '../../utils/promise'
import { PrismaClient } from '../model'
import { httpError } from '../types/HttpError'
import { TLogin } from '../types/login'
import { TRegister } from '../types/register'
import { config } from './config'
import { body, endpoint, user } from './endpoint'

const client = new PrismaClient()
const pHashSync = promiseFn(hashSync)

const register = endpoint({ register: body(TRegister) }, async ({ register }) => {
  const oldUser = await client.user.findFirst({
    where: { email: register.email }
  })
  if (oldUser != null) {
    throw httpError(409, 'email', 'validation.server.userExists')
  }
  if (register.passwordRepeat !== register.password) {
    throw httpError(400, 'passwordRepeat', 'validation.server.passwordMustMatch')
  }
  const data = assoc('password', hashSync(register.password, 10), register)
  const user = await client.user.create({ data })
  const token = sign(`${user.id}`, `${config.TOKEN_KEY}`, { expiresIn: '90d' })
  return client.user.update({ where: { id: user.id }, data: { token } }).then(prop('email'))
})

const login = endpoint({ login: body(TLogin) }, ({ login: { email, password } }) =>
  pHashSync(password, 10).then(encryptedPassword =>
    client.user
      .findFirst({ where: { email } })
      .then(failOn(isNil, httpError(404, 'email', 'validation.server.userNotFound')))
      .then(
        failUnless(
          propEq('password', encryptedPassword),
          httpError(403, 'password', 'validation.server.passwordWrong')
        )
      )
      .then(omit(['password', 'id']))
  )
)

const whomAmI = endpoint({ user }, async ({ user }) => user)

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', {}, register)
  fastify.post('/login', login)
  fastify.get('/whomAmI', whomAmI)
}
