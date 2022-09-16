import { createEffect, sample } from 'effector'
import { find, isNil, propEq, propOr, tap } from 'ramda'
import { Api } from '~shared/apiTypes'
import { Tag } from '~shared/types/domain/tag'
import { ArgFn } from '~shared/types/generic'
import { ModalNames } from '~shared/types/modals'
import { failOn } from '~shared/utils/failOn'
import { $api } from '~stores/$apiStore'

import { openModal } from './modals'

const api = (): Api => sample({ source: $api }).getState()

export const projectFx = createEffect<Api['project']>(() => api().project())
export const dateLocaleFx = createEffect<ArgFn<string, Promise<Locale>>>(locale =>
  import(/* @vite-ignore */ `../../node_modules/date-fns/locale/${locale}`).then(x => x.default)
)

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

export const tagSettingsFx = createEffect<ArgFn<string>>(name =>
  api()
    .tagsSettings()
    .then<Tag[]>(propOr([], 'tags'))
    .then(find(propEq('name', name)))
    .then(failOn<Tag>(isNil, 'No Tag found'))
    .then(params => openModal({ name: ModalNames.TAG_SETTINGS, params }))
)

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
