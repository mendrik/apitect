import { propOr } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Enum } from '~shared/types/domain/enums'
import { Project } from '~shared/types/domain/project'
import { Tag } from '~shared/types/domain/tag'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { resolvePromised } from '~shared/utils/promise'

import { getLastDocument } from '../services'
import { collection, Collections } from '../services/database'
import { enums } from './enums'
import { tagsSettings } from './tagsSettings'
import { userSettings } from './userSettings'

export const project: ServerApiMethod<'project'> = ({ docId, email }) =>
  resolvePromised<Project>({
    document: getLastDocument(docId),
    tags: tagsSettings({ docId, email }).then<Tag[]>(propOr([], 'tags')),
    visibleTags: userSettings({ docId, email }).then<string[]>(propOr([], 'visibleTags')),
    nodeSettings: collection(Collections.nodeSettings).find<NodeSettings>({ docId }).toArray(),
    enums: enums({ docId, email }).then<Enum[]>(propOr([], 'enums'))
  })
