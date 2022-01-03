import { undefined as noArgs } from 'zod'
import { ZEnums } from '~shared/types/domain/enums'
import { ZValue } from '~shared/types/domain/values/value'
import { ZValueBase } from '~shared/types/domain/values/valueBase'
import { ZNewArrayItemRequest } from '~shared/types/request/newArrayItemRequest'

import { idCodec } from './codecs/idCodec'
import { ZNode } from './types/domain/node'
import { ZProject } from './types/domain/project'
import { TNewNode } from './types/forms/newNode'
import { ZNodeSettings } from './types/forms/nodetypes/nodeSettings'
import { ZProjectUsersSettings } from './types/forms/projectUsersSettings'
import { ZTagsSettings } from './types/forms/tagsSettings'
import { ZUserSettings } from './types/forms/userSettings'
import { ZValueListRequest } from './types/request/valueListRequest'
import { TNodeCreated } from './types/response/nodeCreated'
import { TNodeDeleted } from './types/response/nodeDeleted'
import { ZValueList } from './types/response/valueList'

export const ApiSchema = {
  nodeCreate: [TNewNode, TNodeCreated],
  nodeDelete: [idCodec, TNodeDeleted],
  nodeSettings: [idCodec, ZNodeSettings.nullable()],
  project: [noArgs(), ZProject],
  projectUsersSettings: [noArgs(), ZProjectUsersSettings.nullable()],
  tagsSettings: [noArgs(), ZTagsSettings.nullable()],
  updateNodeSettings: [ZNodeSettings, ZNode],
  updateProjectUsersSettings: [ZProjectUsersSettings, ZProjectUsersSettings],
  updateTagsSettings: [ZTagsSettings, ZTagsSettings],
  updateUserSettings: [ZUserSettings, ZUserSettings],
  userSettings: [noArgs(), ZUserSettings.nullable()],
  valueDelete: [ZValueBase, ZValue],
  valueList: [ZValueListRequest, ZValueList],
  valueUpdate: [ZValue, ZValue],
  enums: [noArgs(), ZEnums.nullable()],
  updateEnums: [ZEnums, ZEnums],
  arrayItemCreate: [ZNewArrayItemRequest, ZValueList]
} as const
