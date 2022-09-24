import { createEffect } from 'effector'
import { tap } from 'ramda'
import { Api } from '~shared/apiTypes'
import { ModalNames } from '~shared/types/modals'

import { api } from './api'
import { openModal } from './modals'

export const projectUserSettingsFx = createEffect(() =>
  api()
    .projectUsersSettings()
    .then(tap(params => openModal({ name: ModalNames.PROJECT_USER_SETTINGS, params })))
)
export const updateProjectUserSettingsFx = createEffect<Api['updateProjectUsersSettings']>(
  userSettings => api().updateProjectUsersSettings(userSettings)
)
