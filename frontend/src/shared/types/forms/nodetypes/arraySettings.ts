import { literal, object, string, union } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { idCodec } from '~shared/codecs/idCodec'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export enum DataSource {
  Internal = 'Internal',
  Database = 'Database'
}

export const ZInternal = ZNodeSettingsBase.merge(
  object({
    dataSource: literal(DataSource.Internal).default(DataSource.Internal),
    nodeType: literal(NodeType.Array),
    idField: idCodec
  })
)

export const ZDatabase = ZNodeSettingsBase.merge(
  object({
    dataSource: literal(DataSource.Database),
    nodeType: literal(NodeType.Array),
    idField: string(),
    dbUrl: string(),
    dbUser: string(),
    dbPassword: string(),
    query: string()
  })
)

export const ZArraySettings = union([ZInternal, ZDatabase])
export type ArraySettings = TypeOf<typeof ZArraySettings>
