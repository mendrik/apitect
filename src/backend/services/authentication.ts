import { FastifyInstance } from 'fastify'

import { TLogin } from '../types/login'
import { TRegister } from '../types/register'
import { body, endpoint } from './endpoint'

const register = endpoint({ register: body(TRegister) }, async ({ register }, { OK }) => {
  return OK({ status: 'ok' })
})

const login = endpoint({ login: body(TLogin) }, async ({ login }, { OK, FORBIDDEN }) => {
  return OK({})
})

export const initAuthentication = (fastify: FastifyInstance) => {
  fastify.post('/register', register)
  fastify.post('/login', login)
}
