import { createEffect, sample } from 'effector'
import { tap } from 'ramda'

import { Api } from '../shared/types/api'
import { ModalNames } from '../shared/types/modals'
import $appStore from '../stores/$appStore'
import { openModal } from './modals'
import { projectFx } from './tree'

const state = () => sample($appStore).getState()

export const userSettingsFx = createEffect(() =>
  state()
    .api.userSettings()
    .then(tap(params => openModal({ name: ModalNames.USER_SETTINGS, params })))
)

export const updateUserSettingsFx = createEffect<Api['updateUserSettings']>(userSettings =>
  state()
    .api.updateUserSettings(userSettings)
    .then(p => projectFx.doneData(p))
)
