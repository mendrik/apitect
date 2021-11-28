import { createEffect, sample } from 'effector'
import { tap } from 'ramda'

import { Api } from '../shared/types/api'
import { ModalNames } from '../shared/types/modals'
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
