import { createEffect } from 'effector'
import { tap } from 'ramda'
import { Api } from '~shared/apiTypes'
import { User } from '~shared/types/domain/user'
import { ModalNames } from '~shared/types/modals'

import { whoAmI } from '../utils/restApi'
import { api } from './api'
import { openModal } from './modals'
import { projectFx } from './project'

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
