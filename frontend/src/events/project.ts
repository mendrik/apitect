import { createEffect, sample } from 'effector'
import { find, isNil, propEq, propOr, tap } from 'ramda'

import { Api } from '../shared/types/api'
import { Tag } from '../shared/types/domain/tag'
import { AFn } from '../shared/types/generic'
import { ModalNames } from '../shared/types/modals'
import { failOn } from '../shared/utils/failOn'
import { $api } from '../stores/$apiStore'
import { openModal } from './modals'

const api = () => sample($api).getState()

export const projectFx = createEffect<Api['project']>(() => {
  console.log(api())
  return api().project()
})

export const projectUserSettingsFx = createEffect(() =>
  api()
    .projectUsersSettings()
    .then(tap(params => openModal({ name: ModalNames.PROJECT_USER_SETTINGS, params })))
)

export const updateProjectUserSettingsFx = createEffect<Api['updateProjectUsersSettings']>(
  userSettings => api().updateProjectUsersSettings(userSettings)
)

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

export const tagSettingsFx = createEffect<AFn<string>>(name =>
  api()
    .tagsSettings()
    .then<any[]>(propOr([], 'tags'))
    .then(find(propEq('name', name)))
    .then(failOn<Tag>(isNil, 'No Tag found'))
    .then(params => openModal({ name: ModalNames.TAG_SETTINGS, params }))
)

export const valueListFx = createEffect<Api['valueList']>(req => api().valueList(req))
