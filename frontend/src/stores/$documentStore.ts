import { createStore } from 'effector'
import { assoc, omit } from 'ramda'
import { Document } from '~shared/types/domain/document'

import { projectFx, renameProjectFx } from '../events/project'
import { resetProject } from '../events/reset'

type Doc = Omit<Document, 'tree'>

export const $documentStore = createStore<Doc>({
  name: '',
  id: '',
  owner: ''
})
  .on(projectFx.doneData, (_, result) => omit(['tree'], result.document))
  .on(renameProjectFx.doneData, (doc, name) => assoc('name', name)(doc))
  .reset(resetProject)
