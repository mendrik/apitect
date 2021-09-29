import { User } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { assoc, dissoc, isNil, omit, pipe, propEq } from 'ramda'

import { failOn, failUnless } from '../../utils/failOn'
import { promiseFn } from '../../utils/promise'
import { httpError } from '../types/HttpError'
import { TLogin } from '../types/login'
import { TRegister } from '../types/register'
import { Token } from '../types/token'
import db from './client'
import { config } from './config'
import { body, endpoint, noContent, user } from './endpoint'

const pHashSync = promiseFn(hashSync)

const refreshToken = (user: User): Promise<Token> => {
  const token = sign({ id: user.id, email: user.email, name: user.name }, `${config.TOKEN_KEY}`, {
    expiresIn: '90d'
  })
  return db.user.update({ where: { id: user.id }, data: { token: token } }).then(() => ({ token }))
}

const register = endpoint({ register: body(TRegister) }, async ({ register }) => {
  await db.user
    .findFirst({ where: { email: register.email } })
    .then(failUnless(isNil, httpError(409, 'validation.server.userExists', 'email')))
  if (register.passwordRepeat !== register.password) {
    throw httpError(400, 'validation.server.passwordMustMatch', 'passwordRepeat')
  }
  return db.user
    .create({
      data: pipe(
        assoc('password', hashSync(register.password, config.SALT)),
        dissoc('passwordRepeat')
      )(register)
    })
    .then(refreshToken)
})

const login = endpoint({ login: body(TLogin) }, ({ login: { email, password } }) =>
  pHashSync(password, config.SALT).then(encryptedPassword =>
    db.user
      .findFirst({ where: { email } })
      .then(failOn(isNil, httpError(404, 'validation.server.userNotFound', 'email')))
      .then(
        failUnless<User>(
          propEq('password', encryptedPassword),
          httpError(403, 'validation.server.passwordWrong', 'password')
        )
      )
      .then(refreshToken)
  )
)

const logout = endpoint({ user }, ({ user }) =>
  db.user.update({ where: { id: user.id }, data: { token: null } }).then(noContent)
)

const whomAmI = endpoint({ user }, async ({ user }) => omit(['token', 'password'], user))

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', {}, register)
  fastify.post('/login', login)
  fastify.delete('/logout', logout)
  fastify.get('/whoami', whomAmI)
}
