import * as t from 'io-ts'

export const TUiDocument = t.type({
  name: t.string,
  owner: t.string
})

export type UiDocument = t.TypeOf<typeof TUiDocument>
