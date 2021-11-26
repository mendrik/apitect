import { propOr } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Project } from '~shared/types/domain/project'
import { Tag } from '~shared/types/domain/tag'
import { resolvePromised } from '~shared/utils/promise'

import { getLastDocument } from '../services'
import { tagsSettings } from './tagsSettings'

export const project: ServerApiMethod<'project'> = ({ docId, email, payload }) => {
  return resolvePromised<Project>({
    document: getLastDocument(docId),
    // todo make this come from user settings
    tags: tagsSettings({ docId, email, payload }).then<Tag[]>(propOr([], 'tags'))
  })
}
