import { createEffect, sample } from 'effector'
import { tap } from 'ramda'
import { Api } from '~shared/types/api'
import { User } from '~shared/types/domain/user'
import { ModalNames } from '~shared/types/modals'
import { $api } from '~stores/$apiStore'

import { whoAmI } from '../utils/restApi'
import { openModal } from './modals'
import { projectFx } from './project'

const api = () => sample($api).getState()

export const whoAmIFx = createEffect<() => Promise<User | null>>(() => whoAmI().catch(() => null))

export const userSettingsFx = createEffect<Api['userSettings']>(() =>
  api()
    .userSettings()
    .then(tap(params => openModal({ name: ModalNames.USER_SETTINGS, params })))
)

export const updateUserSettingsFx = createEffect<Api['updateUserSettings']>(userSettings =>
  api()
    .updateUserSettings(userSettings)
    .then(tap(() => projectFx()))
)
