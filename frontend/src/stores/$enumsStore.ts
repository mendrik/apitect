import { createStore } from 'effector'
import { Enum } from '~shared/types/domain/enums'

import { projectFx } from '../events/project'
import { resetProject } from '../events/reset'

export const $enumsStore = createStore<Enum[]>([])
  .on(projectFx.doneData, (state, result) => result.enums)
  .reset(resetProject)
