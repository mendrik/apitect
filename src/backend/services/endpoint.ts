import { FastifyReply, FastifyRequest } from 'fastify'
import { RouteGenericInterface, RouteHandlerMethod } from 'fastify/types/route'
import * as t from 'io-ts'
import { verify } from 'jsonwebtoken'
import { WithId } from 'mongodb'
import { always, applySpec, isNil, mapObjIndexed, mergeRight } from 'ramda'
import { promisify } from 'util'

import { decode, DecodingError } from '../../shared/codecs/decode'
import { httpError, HttpError } from '../../shared/types/HttpError'
import { User } from '../../shared/types/domain/user'
import { Fn } from '../../shared/types/generic'
import { failOn } from '../../shared/utils/failOn'
import { logger } from '../../shared/utils/logger'
import { Promised, resolvePromised } from '../../shared/utils/promise'
import { config } from './config'
import { collection, CollectionMap } from './database'

const headers = { 'Content-Type': 'application/json; charset=utf-8' }

const OK =
  (reply: FastifyReply) =>
  <T>(body?: T) =>
    reply.code(200).headers(headers).send(body)

export const noContent = always({})

type Collector = Record<string, t.Any | ((req: FastifyRequest) => Promise<any> | any)>

export const body =
  <A, O, I>(decoder: t.Type<A, O, I>) =>
  (req: FastifyRequest): A =>
    decode<A, O, I>(decoder)(req.body as any)

export const coll = (name: keyof CollectionMap) => (_req: FastifyRequest) => collection(name)
export const verifyP: Fn<Promise<{ id: string }>> = promisify<any, any>(verify)

export const header =
  <A, O, I>(name: string, decoder: t.Type<A, O, I>) =>
  (req: FastifyRequest): A =>
    decode<A, O, I>(decoder)(req.headers[name] as any)

export const user = (req: FastifyRequest): Promise<WithId<User>> =>
  verifyP(req.raw.headers['x-access-token'] as string, `${config.TOKEN_KEY}`)
    // todo decode ObjectId
    .then(({ id }) => collection('users').then(_ => _.findOne(id)))
    .then(failOn<WithId<User>>(isNil, httpError(403, 'User not found')))
    .catch(e => {
      throw httpError(403, `Unauthorized: ${e.message}`)
    })

const handleError = (reply: FastifyReply) => (e: Error) => {
  logger.error(e.message, e.stack)
  const send = (status: number, data: any) =>
    reply.code(status).send(JSON.stringify({ ...data, status }))
  if (e instanceof DecodingError) {
    return send(400, { message: e.message })
  }
  if (e instanceof HttpError) {
    return send(e.status, { message: e.message, field: e.field })
  }
  return send(500, { message: 'Server error' })
}

export const endpoint =
  <
    DEPS extends Collector,
    RESOLVED = {
      [KEY in keyof DEPS]: DEPS[KEY] extends (...args: any[]) => Promise<infer PROMISED>
        ? PROMISED
        : DEPS[KEY] extends (...args: any[]) => any
        ? ReturnType<DEPS[KEY]>
        : DEPS[KEY] extends t.Any
        ? t.OutputOf<DEPS[KEY]>
        : DEPS[KEY]
    }
  >(
    dependencies: DEPS,
    body: (obj: RESOLVED) => Promise<RouteGenericInterface['Reply']>
  ): RouteHandlerMethod =>
  (req, reply) => {
    try {
      const paramObj = mapObjIndexed((dependencyName, dependencyResolver) => {
        if ('decode' in dependencyName) {
          const value: string = mergeRight(req.params as any, req.query as any)?.[
            dependencyResolver
          ]
          return always(decode(dependencyName)(value))
        }
        return dependencyName
      }, dependencies)
      const resObj = applySpec<Promised<RESOLVED>>(paramObj)(req)
      return resolvePromised(resObj)
        .then(res => body(res))
        .then(OK(reply))
        .catch(handleError(reply))
    } catch (e) {
      handleError(reply)(e as Error)
    }
  }
