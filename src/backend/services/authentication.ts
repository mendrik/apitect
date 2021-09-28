import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { assoc, dissoc, isNil, pick, pipe, propEq } from 'ramda'

import { failOn, failUnless } from '../../utils/failOn'
import { promiseFn } from '../../utils/promise'
import { httpError } from '../types/HttpError'
import { TLogin } from '../types/login'
import { TRegister } from '../types/register'
import db from './client'
import { config } from './config'
import { body, endpoint, tx, user } from './endpoint'

const pHashSync = promiseFn(hashSync)

const register = endpoint({ register: body(TRegister), tx }, ({ register, tx }) =>
  tx(async db => {
    await db.user
      .findFirst({ where: { email: register.email } })
      .then(failUnless(isNil, httpError(409, 'email', 'validation.server.userExists')))
    if (register.passwordRepeat !== register.password) {
      throw httpError(400, 'passwordRepeat', 'validation.server.passwordMustMatch')
    }
    const data = pipe(
      assoc('password', hashSync(register.password, 10)),
      dissoc('passwordRepeat')
    )(register)
    const user = await db.user.create({ data })
    const token = sign({ id: user.id, email: user.email, name: user.name }, `${config.TOKEN_KEY}`, {
      expiresIn: '90d'
    })
    return db.user.update({ where: { id: user.id }, data: { token } }).then(pick(['token']))
  })
)

const login = endpoint({ login: body(TLogin) }, ({ login: { email, password } }) =>
  pHashSync(password, 10).then(encryptedPassword =>
    db.user
      .findFirst({ where: { email } })
      .then(failOn(isNil, httpError(404, 'email', 'validation.server.userNotFound')))
      .then(
        failUnless(
          propEq('password', encryptedPassword),
          httpError(403, 'password', 'validation.server.passwordWrong')
        )
      )
      .then(pick(['token']))
  )
)

const whomAmI = endpoint({ user }, async ({ user }) => user)

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', {}, register)
  fastify.post('/login', login)
  fastify.get('/whomAmI', whomAmI)
}
