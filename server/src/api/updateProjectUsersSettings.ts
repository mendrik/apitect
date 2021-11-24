import { ServerApiMethod } from '~shared/apiResponse'

export const updateProjectUsersSettings: ServerApiMethod<'updateProjectUsersSettings'> = ({
  email,
  payload: userSettings
}) => Promise.resolve(userSettings)
