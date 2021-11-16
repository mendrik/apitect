import { FastifyReply, FastifyRequest } from 'fastify'
import { RouteGenericInterface, RouteHandlerMethod } from 'fastify/types/route'
import { verify } from 'jsonwebtoken'
import { always, applySpec, mapObjIndexed, mergeRight, prop } from 'ramda'
import { promisify } from 'util'
import { ZodError, ZodSchema } from 'zod'
import { User } from '~shared/types/domain/user'
import { Fn } from '~shared/types/generic'
import { HttpError, httpError } from '~shared/types/httpError'
import { logger } from '~shared/utils/logger'
import { Promised, resolvePromised } from '~shared/utils/promise'

import { config } from './config'
import { getUser } from './user'

const headers = { 'Content-Type': 'application/json; charset=utf-8' }

const OK =
  (reply: FastifyReply) =>
  <T>(body?: T) =>
    reply.code(200).headers(headers).send(body)

export const noContent = always({})

type Collector = Record<string, ZodSchema<any> | ((req: FastifyRequest) => Promise<any> | any)>

export const body =
  <S>(decoder: ZodSchema<S>) =>
  (req: FastifyRequest): S =>
    decoder.parse(req.body)

export const verifyP: Fn<Promise<{ email: string }>> = promisify<any, any>(verify)

export const header =
  <S>(name: string, decoder: ZodSchema<S>) =>
  (req: FastifyRequest): S =>
    decoder.parse(req.headers[name])

export const user = (req: FastifyRequest): Promise<User> =>
  verifyP(req.raw.headers['x-access-token'] as string, `${config.TOKEN_KEY}`)
    .then(prop('email'))
    .then(getUser)
    .catch(e => {
      throw httpError(403, `Unauthorized: ${e.message}`)
    })

const handleError = (reply: FastifyReply) => (e: Error) => {
  logger.error(e.message, e.stack)
  const send = (status: number, data: any) =>
    reply.code(status).send(JSON.stringify({ ...data, status }))
  if (e instanceof ZodError) {
    return send(400, { message: e.message })
  }
  if (e instanceof HttpError) {
    return send(e.status, { message: e.message, field: e.field })
  }
  return send(500, { message: `${e?.constructor?.name ?? 'Error'}: ${e.message}` })
}

export const endpoint =
  <
    DEPS extends Collector,
    RESOLVED = {
      [KEY in keyof DEPS]: DEPS[KEY] extends (...args: any[]) => Promise<infer PROMISED>
        ? PROMISED
        : DEPS[KEY] extends (...args: any[]) => any
        ? ReturnType<DEPS[KEY]>
        : DEPS[KEY] extends ZodSchema<infer S>
        ? S
        : DEPS[KEY]
    }
  >(
    dependencies: DEPS,
    body: (obj: RESOLVED) => Promise<RouteGenericInterface['Reply']>
  ): RouteHandlerMethod =>
  (req, reply) => {
    try {
      const paramObj = mapObjIndexed((dependencyName, dependencyResolver) => {
        if ('parse' in dependencyName) {
          const value: string = mergeRight(req.params as any, req.query as any)?.[
            dependencyResolver
          ]
          return always(dependencyName.parse(value))
        }
        return dependencyName
      }, dependencies)
      const resObj = applySpec<Promised<RESOLVED>>(paramObj)(req)
      return resolvePromised(resObj).then(body).then(OK(reply)).catch(handleError(reply))
    } catch (e) {
      handleError(reply)(e as Error)
      return void 0
    }
  }
