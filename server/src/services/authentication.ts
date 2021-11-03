import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { ObjectId, WithId } from 'mongodb'
import { assoc, dissoc, isNil, pipe, propEq } from 'ramda'
import { decode } from '~shared/codecs/decode'
import { TUiUser, UiUser } from '~shared/types/domain/user'
import { TForgotPassword } from '~shared/types/forms/forgotPassword'
import { TLogin } from '~shared/types/forms/login'
import { TRegister } from '~shared/types/forms/register'
import { httpError } from '~shared/types/httpError'
import { Token } from '~shared/types/response/token'
import { failOn, failUnless } from '~shared/utils/failOn'
import { promiseFn } from '~shared/utils/promise'
import { id } from '~shared/utils/rename'

import { User } from '../types/user'
import { config } from './config'
import { collection, withTransaction } from './database'
import { body, endpoint, noContent, user } from './endpoint'

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
      {
        _id: docId,
        name: 'Unknown document',
        owner: userId,
        tree: {
          name: 'root',
          children: []
        }
      },
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
