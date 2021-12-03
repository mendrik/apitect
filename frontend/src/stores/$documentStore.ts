import { createStore } from 'effector'
import { omit } from 'ramda'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'
import { Document } from '../shared/types/domain/document'

type Doc = Omit<Document, 'tree'>

export const $documentStore = createStore<Doc>({
  name: '',
  id: '',
  owner: ''
})

$documentStore.on(projectFx.done, (_, { result }) => omit(['tree'], result.document))

$documentStore.reset(resetProject)
