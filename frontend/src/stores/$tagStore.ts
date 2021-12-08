import { createStore } from 'effector'
import { applySpec, filter, identity, pipe } from 'ramda'
import { included } from 'ramda-adjunct'
import { Tag } from '~shared/types/domain/tag'
import { field } from '~shared/utils/ramda'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'

type TagStore = {
  tags: Tag[]
  visibleTags: Tag[]
}

export const $tagStore = createStore<TagStore>({
  tags: [],
  visibleTags: []
})
  .on(projectFx.doneData, (_, result) =>
    applySpec<TagStore>({
      tags: identity,
      visibleTags: filter(pipe(field('name'), included(result.visibleTags)))
    })(result.tags)
  )
  .reset(resetProject)
