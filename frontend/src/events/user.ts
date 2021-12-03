import { createEffect, sample } from 'effector'
import { tap } from 'ramda'

import { Api } from '../shared/types/api'
import { ModalNames } from '../shared/types/modals'
import { $api } from '../stores/$apiStore'
import { openModal } from './modals'
import { projectFx } from './tree'

const api = () => sample($api).getState()

export const userSettingsFx = createEffect(() =>
  api()
    .userSettings()
    .then(tap(params => openModal({ name: ModalNames.USER_SETTINGS, params })))
)

export const updateUserSettingsFx = createEffect<Api['updateUserSettings']>(userSettings =>
  api()
    .updateUserSettings(userSettings)
    .then(tap(() => projectFx()))
)
