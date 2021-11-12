import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { assoc, dissoc, isNil, pipe, propEq } from 'ramda'
import { newId } from '~shared/codecs/idCodec'
import { NodeType } from '~shared/types/domain/nodeType'
import { User } from '~shared/types/domain/user'
import { TForgotPassword } from '~shared/types/forms/forgotPassword'
import { TLogin } from '~shared/types/forms/login'
import { TRegister } from '~shared/types/forms/register'
import { httpError } from '~shared/types/httpError'
import { Token } from '~shared/types/response/token'
import { failOn, failUnless } from '~shared/utils/failOn'
import { promiseFn } from '~shared/utils/promise'

import { config } from './config'
import { collection, Collections, withTransaction } from './database'
import { body, endpoint, noContent, user } from './endpoint'

const pHashSync = promiseFn(hashSync)

const signedToken = ({ email, name }: Record<string, string>) =>
  sign({ email, name }, `${config.TOKEN_KEY}`, {
    expiresIn: '90d'
  })

const refreshToken = async (user: User): Promise<Token> => {
  const token = signedToken({ email: user.email, name: user.name })
  await collection(Collections.users).updateOne({ email: user.email }, { $set: { token } })
  return { token }
}

const register = endpoint({ register: body(TRegister) }, ({ register }) =>
  withTransaction(async session => {
    await collection(Collections.users)
      .findOne({ email: register.email })
      .then(failUnless(isNil, httpError(409, 'validation.server.userExists', 'email')))
    if (register.passwordRepeat !== register.password) {
      throw httpError(400, 'validation.server.passwordMustMatch', 'passwordRepeat')
    }
    const data = pipe(
      assoc('password', hashSync(register.password, config.SALT)),
      dissoc('passwordRepeat')
    )(register)
    const docId = newId()
    const rootId = newId()
    const token = {
      token: signedToken({ email: data.email, name: data.name })
    }
    await collection(Collections.users).insertOne(
      { ...data, ...token, lastDocument: docId },
      { session }
    )
    await collection(Collections.documents).insertOne(
      {
        id: docId,
        name: 'Unknown document',
        owner: register.email,
        tree: {
          id: rootId,
          name: 'root',
          nodeType: NodeType.Object,
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
    collection(Collections.users)
      .findOne({ email })
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

const forgotPassword = endpoint(
  { forgotPassword: body(TForgotPassword) },
  ({ forgotPassword: { email } }) =>
    collection(Collections.users)
      .findOne({ email })
      .then(failOn(isNil, httpError(404, 'validation.server.userNotFound', 'email')))
)

const logout = endpoint({ user }, ({ user }) =>
  collection(Collections.users)
    .updateOne({ email: user.email }, { $set: { token: null } })
    .then(noContent)
)

const whomAmI = endpoint({ user }, async ({ user }): Promise<User> => user)

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', {}, register)
  fastify.post('/login', login)
  fastify.delete('/logout', logout)
  fastify.get('/whoami', whomAmI)
  fastify.put('/forgot-password', forgotPassword)
}
