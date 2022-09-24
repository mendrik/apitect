import { createEffect } from 'effector'
import { find, isNil, propEq, propOr, tap } from 'ramda'
import { Api } from '~shared/apiTypes'
import { Tag } from '~shared/types/domain/tag'
import { ArgFn } from '~shared/types/generic'
import { ModalNames } from '~shared/types/modals'
import { failOn } from '~shared/utils/failOn'

import { api } from './api'
import { openModal } from './modals'
import { projectFx } from './project'

export const tagsSettingsFx = createEffect(() =>
  api()
    .tagsSettings()
    .then(tap(params => openModal({ name: ModalNames.TAGS_SETTINGS, params })))
)
export const updateTagsSettingsFx = createEffect<Api['updateTagsSettings']>(tagsSettings =>
  api()
    .updateTagsSettings(tagsSettings)
    .then(tap(() => projectFx()))
)
export const tagSettingsFx = createEffect<ArgFn<string>>(name =>
  api()
    .tagsSettings()
    .then<Tag[]>(propOr([], 'tags'))
    .then(find(propEq('name', name)))
    .then(failOn<Tag>(isNil, 'No Tag found'))
    .then(params => openModal({ name: ModalNames.TAG_SETTINGS, params }))
)
