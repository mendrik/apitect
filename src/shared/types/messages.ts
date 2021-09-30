import * as t from 'io-ts'

const ProjectRequest = t.type({
  type: t.literal('PROJECT')
})

const AuthorizeRequest = t.type({
  type: t.literal('AUTHORIZE'),
  jwt: t.string
})

const NodeRequest = t.type({
  type: t.literal('NODE')
})

export const TClientMessage = t.union([AuthorizeRequest, ProjectRequest, NodeRequest])

export type ClientMessage = t.TypeOf<typeof TClientMessage>

const ProjectResponse = t.type({
  type: t.literal('PROJECT')
})

const NodeResponse = t.type({
  type: t.literal('NODE')
})

export const TServerMessage = t.union([ProjectResponse, NodeResponse])

export type ServerMessage = t.TypeOf<typeof TServerMessage>
