import { createStore } from 'effector'
import { omit } from 'ramda'

import { resetProject } from '../events/reset'
import { projectFx } from '../events/tree'
import { Document } from '../shared/types/domain/document'

type Doc = Omit<Document, 'tree'>

export const $documentStore = createStore<Doc>({
  name: '',
  id: '',
  owner: ''
})

$documentStore.watch(projectFx.done, (_, { result }) => omit(['tree'], result.document))

$documentStore.reset(resetProject)
