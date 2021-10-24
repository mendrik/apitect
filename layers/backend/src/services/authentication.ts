import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { ObjectId, WithId } from 'mongodb'
import { assoc, dissoc, isNil, pipe, propEq } from 'ramda'

import { User } from '../types/user'
import { config } from './config'
import { collection, withTransaction } from './database'
import { body, endpoint, noContent, user } from './endpoint'
import { promiseFn } from '../../../shared/src/utils/promise'
import { Token } from '../../../shared/src/types/response/token'
import { TRegister } from '../../../shared/src/types/forms/register'
import { failOn, failUnless } from '../../../shared/src/utils/failOn'
import { decode } from '../../../shared/src/codecs/decode'
import { id } from '../../../shared/src/utils/rename'
import { httpError } from '../../../shared/src/types/httpError'
import { TLogin } from '../../../shared/src/types/forms/login'
import { TForgotPassword } from '../../../shared/src/types/forms/forgotPassword'
import { TUiUser, UiUser } from '../../../shared/src/types/domain/user'

const pHashSync = promiseFn(hashSync)

const signedToken = ({ id, email, name }: Record<string, string>) =>
  sign({ id, email, name }, `${config.TOKEN_KEY}`, {
    expiresIn: '90d'
  })

const refreshToken = async (user: WithId<User>): Promise<Token> => {
  const token = signedToken({ id: user._id.toHexString(), email: user.email, name: user.name })
  await collection('users').updateOne({ _id: user._id }, { $set: { token } })
  return { token }
}

const register = endpoint({ register: body(TRegister) }, ({ register }) =>
  withTransaction(async session => {
    await collection('users')
      .findOne({ email: register.email })
      .then(failUnless(isNil, httpError(409, 'validation.server.userExists', 'email')))
    if (register.passwordRepeat !== register.password) {
      throw httpError(400, 'validation.server.passwordMustMatch', 'passwordRepeat')
    }
    const data = pipe(
      assoc('password', hashSync(register.password, config.SALT)),
      dissoc('passwordRepeat')
    )(register)
    const docId = new ObjectId()
    const userId = new ObjectId()
    const token = {
      token: signedToken({ id: userId.toHexString(), email: data.email, name: data.name })
    }
    await collection('users').insertOne(
      { _id: userId, ...data, ...token, lastDocument: docId },
      { session }
    )
    await collection('documents').insertOne(
      { _id: docId, name: 'Unknown document', owner: userId },
      { session }
    )
    return token
  })
)

const login = endpoint({ login: body(TLogin) }, ({ login: { email, password } }) =>
  pHashSync(password, config.SALT).then(encryptedPassword =>
    collection('users')
      .findOne({ email })
      .then(failOn(isNil, httpError(404, 'validation.server.userNotFound', 'email')))
      .then(
        failUnless<WithId<User>>(
          propEq('password', encryptedPassword),
          httpError(403, 'validation.server.passwordWrong', 'password')
        )
      )
      .then(refreshToken)
  )
)

const forgotPassword = endpoint(
  { forgotPassword: body(TForgotPassword) },
  ({ forgotPassword: { email } }) =>
    collection('users')
      .findOne({ email })
      .then(failOn(isNil, httpError(404, 'validation.server.userNotFound', 'email')))
)

const logout = endpoint({ user }, ({ user }) =>
  collection('users')
    .updateOne({ id: user._id }, { $set: { token: null } })
    .then(noContent)
)

const whomAmI = endpoint({ user }, async ({ user }): Promise<UiUser> => decode(TUiUser)(id(user)))

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', {}, register)
  fastify.post('/login', login)
  fastify.delete('/logout', logout)
  fastify.get('/whoami', whomAmI)
  fastify.put('/forgot-password', forgotPassword)
}