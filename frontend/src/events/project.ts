import { createEffect, createEvent, sample } from 'effector'
import { find, isNil, propEq, propOr, tap } from 'ramda'

import { Api } from '../shared/types/api'
import { Tag } from '../shared/types/domain/tag'
import { AFn } from '../shared/types/generic'
import { ModalNames } from '../shared/types/modals'
import { failOn } from '../shared/utils/failOn'
import $appStore from '../stores/$appStore'
import { openModal } from './modals'
import { projectFx } from './tree'

const state = () => sample($appStore).getState()

export const projectUserSettingsFx = createEffect(() =>
  state()
    .api.projectUsersSettings()
    .then(tap(params => openModal({ name: ModalNames.PROJECT_USER_SETTINGS, params })))
)

export const updateProjectUserSettingsFx = createEffect<Api['updateProjectUsersSettings']>(
  userSettings => state().api.updateProjectUsersSettings(userSettings)
)

export const tagsSettingsFx = createEffect(() =>
  state()
    .api.tagsSettings()
    .then(tap(params => openModal({ name: ModalNames.TAGS_SETTINGS, params })))
)

export const updateTagsSettingsFx = createEffect<Api['updateTagsSettings']>(tagsSettings =>
  state()
    .api.updateTagsSettings(tagsSettings)
    .then(tap(() => projectFx()))
)

export const tagSettingsFx = createEffect<AFn<string>>(name =>
  state()
    .api.tagsSettings()
    .then<any[]>(propOr([], 'tags'))
    .then(find(propEq('name', name)))
    .then(failOn<Tag>(isNil, 'No Tag found'))
    .then(params => openModal({ name: ModalNames.TAG_SETTINGS, params }))
)

export const resetStore = createEvent()
