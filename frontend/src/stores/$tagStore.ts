import { createStore } from 'effector'
import { applySpec, filter, identity, pipe } from 'ramda'
import { included } from 'ramda-adjunct'
import { Tag } from '~shared/types/domain/tag'

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
  .on(projectFx.doneData, (_, { tags, visibleTags }) =>
    applySpec<TagStore>({
      tags: identity,
      visibleTags: filter(pipe(x => x.name, included(visibleTags)))
    })(tags)
  )
  .reset(resetProject)
