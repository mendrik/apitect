import { createEffect, sample } from 'effector'
import { tap } from 'ramda'

import { Api } from '../shared/api'
import { ModalNames } from '../shared/types/modals'
import $appStore from '../stores/$appStore'
import { openModal } from './modals'

const state = () => sample($appStore).getState()

export const projectUserSettingsFx = createEffect(() =>
  state()
    .api.projectUsersSettings()
    .then(tap(params => openModal({ name: ModalNames.PROJECT_USER_SETTINGS, params })))
)

export const updateProjectUserSettingsFx = createEffect<Api['updateProjectUsersSettings']>(
  userSettings => state().api.updateProjectUsersSettings(userSettings)
)
