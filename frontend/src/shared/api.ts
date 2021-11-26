import { undefined as undef } from 'zod'

import { idCodec } from './codecs/idCodec'
import { ZNode } from './types/domain/node'
import { ZProject } from './types/domain/project'
import { TNewNode } from './types/forms/newNode'
import { ZNodeSettings } from './types/forms/nodetypes/nodeSettings'
import { ZProjectUsersSettings } from './types/forms/projectUsersSettings'
import { ZTagsSettings } from './types/forms/tagsSettings'
import { ZUserSettings } from './types/forms/userSettings'
import { TNodeCreated } from './types/response/nodeCreated'
import { TNodeDeleted } from './types/response/nodeDeleted'

export const ApiSchema = {
  project: [undef(), ZProject],
  nodeSettings: [idCodec, ZNodeSettings.nullable()],
  updateNodeSettings: [ZNodeSettings, ZNode],
  projectUsersSettings: [undef(), ZProjectUsersSettings.nullable()],
  updateProjectUsersSettings: [ZProjectUsersSettings, ZProjectUsersSettings],
  tagsSettings: [undef(), ZTagsSettings.nullable()],
  updateTagsSettings: [ZTagsSettings, ZTagsSettings],
  userSettings: [undef(), ZUserSettings.nullable()],
  updateUserSettings: [ZUserSettings, ZUserSettings],
  nodeDelete: [idCodec, TNodeDeleted],
  nodeCreate: [TNewNode, TNodeCreated]
} as const
