import { literal, object, string, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export enum DataSourceType {
  Internal = 'Internal',
  Database = 'Database'
}

const ZInternal = ZNodeSettingsBase.merge(
  object({
    dataSource: literal(DataSourceType.Internal).default(DataSourceType.Internal),
    nodeType: literal(NodeType.Array),
    displayFormat: string().default('id')
  })
)

const ZDatabase = ZNodeSettingsBase.merge(
  object({
    dataSource: literal(DataSourceType.Database),
    nodeType: literal(NodeType.Array),
    displayFormat: string(),
    dbUrl: string(),
    dbUser: string(),
    dbPassword: string(),
    query: string()
  })
)

export const ZArraySettings = union([ZInternal, ZDatabase])
export type ArraySettings = TypeOf<typeof ZArraySettings>
