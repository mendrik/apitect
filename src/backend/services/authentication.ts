import { hashSync } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { sign } from 'jsonwebtoken'
import { ObjectId, WithId } from 'mongodb'
import { always, assoc, dissoc, isNil, pipe, propEq } from 'ramda'

import { httpError } from '../../shared/types/HttpError'
import { UiUser } from '../../shared/types/domain/user'
import { TForgotPassword } from '../../shared/types/forms/forgotPassword'
import { TLogin } from '../../shared/types/forms/login'
import { TRegister } from '../../shared/types/forms/register'
import { Token } from '../../shared/types/response/token'
import { failOn, failUnless } from '../../shared/utils/failOn'
import { promiseFn } from '../../shared/utils/promise'
import { User } from '../types/user'
import { extractId } from '../utils/id'
import { documentRef, userRef } from '../utils/reference'
import { config } from './config'
import { collection } from './database'
import { body, coll, endpoint, noContent, user } from './endpoint'

const pHashSync = promiseFn(hashSync)

const signedToken = ({ id, email, name }: Record<string, string>) =>
  sign({ id, email, name }, `${config.TOKEN_KEY}`, {
    expiresIn: '90d'
  })

const refreshToken = (user: WithId<User>): Promise<Token> => {
  const token = signedToken({ id: user._id.toHexString(), email: user.email, name: user.name })
  return collection('users')
    .then(_ => _.updateOne({ _id: user._id }, { token: token }))
    .then(always({ token }))
}

const register = endpoint(
  { register: body(TRegister), users: coll('users'), docs: coll('documents') },
  async ({ register, users, docs }) => {
    users
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
    await users.insertOne({ _id: userId, ...data, lastDocument: documentRef(docId) })
    await docs.insertOne({ name: 'Unknown document', owner: userRef(userId) })
    return token
  }
)

const login = endpoint(
  { login: body(TLogin), users: coll('users') },
  ({ login: { email, password }, users }) =>
    pHashSync(password, config.SALT).then(encryptedPassword =>
      users
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
  { forgotPassword: body(TForgotPassword), users: coll('users') },
  ({ forgotPassword: { email }, users }) =>
    users
      .findOne({ email })
      .then(failOn(isNil, httpError(404, 'validation.server.userNotFound', 'email')))
)

const logout = endpoint({ user, users: coll('users') }, ({ user, users }) =>
  users.updateOne(user._id, { token: null }).then(noContent)
)

const whomAmI = endpoint(
  { user },
  async ({ user }): Promise<UiUser> => ({
    name: user.name,
    email: user.email,
    id: extractId(user),
    lastDocument: user.lastDocument.$id.toHexString()
  })
)

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', {}, register)
  fastify.post('/login', login)
  fastify.delete('/logout', logout)
  fastify.get('/whoami', whomAmI)
  fastify.put('/forgot-password', forgotPassword)
}
