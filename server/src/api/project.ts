import { propOr } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Project } from '~shared/types/domain/project'
import { Tag } from '~shared/types/domain/tag'
import { resolvePromised } from '~shared/utils/promise'

import { getLastDocument } from '../services'
import { tagsSettings } from './tagsSettings'
import { userSettings } from './userSettings'

export const project: ServerApiMethod<'project'> = ({ docId, email }) => {
  return resolvePromised<Project>({
    document: getLastDocument(docId),
    tags: tagsSettings({ docId, email }).then<Tag[]>(propOr([], 'tags')),
    visibleTags: userSettings({ docId, email }).then<string[]>(propOr([], 'visibleTags'))
  })
}
