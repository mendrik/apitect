import { FastifyReply, FastifyRequest } from 'fastify'
import { RouteGenericInterface, RouteHandlerMethod } from 'fastify/types/route'
import * as t from 'io-ts'
import { always, applySpec, mapObjIndexed, mergeRight } from 'ramda'

import { decode } from '../../utils/decode'
import { Promised, resolvePromised } from '../../utils/promise'
import { logger } from './logger'

const replyMap = (reply: FastifyReply) => ({
  OK: <T>(body?: T) =>
    reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(body),
  FORBIDDEN: () => reply.code(400).header('Content-Type', 'application/json; charset=utf-8'),
  NOT_FOUND: () => reply.code(404).header('Content-Type', 'application/json; charset=utf-8')
})

type Collector = Record<string, t.Any | ((req: FastifyRequest) => Promise<any> | any)>

export const body =
  <A, O, I>(decoder: t.Type<A, O, I>) =>
  (req: FastifyRequest): A =>
    decode<A, O, I>(decoder)(req.body as any)

export const header =
  <A, O, I>(name: string, decoder: t.Type<A, O, I>) =>
  (req: FastifyRequest): A =>
    decode<A, O, I>(decoder)(req.headers[name] as any)

const handleError = (e: Error) => {
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
    const resObj = applySpec<Promised<RESOLVED>>(paramObj)(req)
    return resolvePromised(resObj)
      .then(res => body(res, replyMap(reply)))
      .catch(handleError)
  }
