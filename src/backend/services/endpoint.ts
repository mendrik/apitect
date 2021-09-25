import { FastifyReply, FastifyRequest } from 'fastify'
import { RouteGenericInterface, RouteHandlerMethod } from 'fastify/types/route'
import * as t from 'io-ts'
import jwt from 'jsonwebtoken'
import { always, applySpec, isNil, mapObjIndexed, mergeRight } from 'ramda'

import { decode, DecodingError } from '../../utils/decode'
import { logger } from '../../utils/logger'
import { Promised, resolvePromised } from '../../utils/promise'
import { PrismaClient, User } from '../model'
import { HttpError } from '../types/HttpError'
import { config } from './config'
import { failOn } from './failOn'

const client = new PrismaClient()
const headers = { 'Content-Type': 'application/json; charset=utf-8' }

const replyMap = (reply: FastifyReply) => ({
  OK: <T>(body?: T) => reply.code(200).headers(headers).send(body),
  BAD_REQUEST: <T>(body?: T) => reply.code(400).headers(headers).send(body),
  FORBIDDEN: () => reply.code(403).headers(headers),
  NOT_FOUND: () => reply.code(404).headers(headers),
  CONFLICT: () => reply.code(409).headers(headers)
})

type Collector = Record<string, t.Any | ((req: FastifyRequest) => Promise<any> | any)>

export const body =
  <A, O, I>(decoder: t.Type<A, O, I>) =>
  (req: FastifyRequest): A =>
    decode<A, O, I>(decoder)(JSON.parse(req.body as any))

export const header =
  <A, O, I>(name: string, decoder: t.Type<A, O, I>) =>
  (req: FastifyRequest): A =>
    decode<A, O, I>(decoder)(req.headers[name] as any)

export const user = (req: FastifyRequest): Promise<User> => {
  const token = req.headers['x-access-token'] as string
  try {
    const id = +jwt.verify(token, `${config.TOKEN_KEY}`)
    return client.user.findFirst({ where: { id } }).then(failOn<User>(isNil, 'User not found'))
  } catch (e) {
    throw new HttpError(403)
  }
}

const handleError = (reply: FastifyReply) => (e: Error) => {
  if (e instanceof DecodingError) {
    return replyMap(reply)['FORBIDDEN']()
  }
  logger.error(`Unexpected error`, { stack: e.stack, message: e.message })
  throw e
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
    body: (
      obj: RESOLVED,
      reply: ReturnType<typeof replyMap>
    ) => Promise<RouteGenericInterface['Reply']>
  ): RouteHandlerMethod =>
  (req, reply) => {
    const paramObj = mapObjIndexed((dependencyName, dependencyResolver) => {
      if ('decode' in dependencyName) {
        const value: string = mergeRight(req.params as any, req.query as any)?.[dependencyResolver]
        return always(decode(dependencyName)(value))
      }
      return dependencyName
    }, dependencies)
    try {
      const resObj = applySpec<Promised<RESOLVED>>(paramObj)(req)
      return resolvePromised(resObj).then(res => body(res, replyMap(reply)))
    } catch (e) {
      handleError(reply)(e as Error)
    }
  }
