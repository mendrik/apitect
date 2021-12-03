import { createStore } from 'effector'
import { applySpec, filter, identity, pipe } from 'ramda'
import { included } from 'ramda-adjunct'

import { resetProject } from '../events/reset'
import { projectFx } from '../events/tree'
import { Tag } from '../shared/types/domain/tag'
import { field } from '../shared/utils/ramda'

type TagStore = {
  tags: Tag[]
  visibleTags: Tag[]
}

export const $tagStore = createStore<TagStore>({
  tags: [],
  visibleTags: []
})

$tagStore.watch(projectFx.done, (_, { result }) =>
  applySpec<TagStore>({
    tags: identity,
    visibleTags: filter(pipe(field('name'), included(result.visibleTags)))
  })(result.tags)
)

$tagStore.reset(resetProject)
