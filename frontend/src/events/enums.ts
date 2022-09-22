import { createEffect } from 'effector'
import { tap } from 'ramda'
import { Api } from '~shared/apiTypes'
import { ModalNames } from '~shared/types/modals'

import { api } from './api'
import { openModal } from './modals'
import { projectFx } from './project'

export const enumsFx = createEffect<Api['enums']>(() =>
  api()
    .enums()
    .then(tap(params => openModal({ name: ModalNames.ENUMS_SETTINGS, params })))
)
export const updateEnumsFx = createEffect<Api['updateEnums']>(req =>
  api()
    .updateEnums(req)
    .then(tap(() => projectFx()))
)
