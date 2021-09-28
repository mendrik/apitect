import { User } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { assoc, dissoc, isNil, pipe, propEq } from 'ramda'

import { failOn, failUnless } from '../../utils/failOn'
import { promiseFn } from '../../utils/promise'
import { httpError } from '../types/HttpError'
import { TLogin } from '../types/login'
import { TRegister } from '../types/register'
import { Token } from '../types/token'
import db from './client'
import { config } from './config'
import { body, endpoint, user } from './endpoint'

const pHashSync = promiseFn(hashSync)

const SALT = genSaltSync()

const refreshToken = (user: User): Promise<Token> => {
  const token = sign({ id: user.id, email: user.email, name: user.name }, `${config.TOKEN_KEY}`, {
    expiresIn: '90d'
  })
  return db.user.update({ where: { id: user.id }, data: { token: token } }).then(() => ({ token }))
}

const register = endpoint({ register: body(TRegister) }, async ({ register }) => {
  await db.user
    .findFirst({ where: { email: register.email } })
    .then(failUnless(isNil, httpError(409, 'email', 'validation.server.userExists')))
  if (register.passwordRepeat !== register.password) {
    throw httpError(400, 'passwordRepeat', 'validation.server.passwordMustMatch')
  }
  return db.user
    .create({
      data: pipe(
        assoc('password', hashSync(register.password, SALT)),
        dissoc('passwordRepeat')
      )(register)
    })
    .then(refreshToken)
})

const login = endpoint({ login: body(TLogin) }, ({ login: { email, password } }) =>
  pHashSync(password, SALT).then(encryptedPassword =>
    db.user
      .findFirst({ where: { email } })
      .then(failOn(isNil, httpError(404, 'email', 'validation.server.userNotFound')))
      .then(
        failUnless<User>(
          propEq('password', encryptedPassword),
          httpError(403, 'password', 'validation.server.passwordWrong')
        )
      )
      .then(refreshToken)
  )
)

const logout = endpoint({ user }, ({ user }) =>
  db.user.update({ where: { id: user.id }, data: { token: null } })
)

const whomAmI = endpoint({ user }, async ({ user }) => user)

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', {}, register)
  fastify.post('/login', login)
  fastify.get('/logout', logout)
  fastify.get('/whoami', whomAmI)
}
