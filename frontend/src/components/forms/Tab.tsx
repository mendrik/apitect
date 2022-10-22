import { Jsx } from '~shared/types/generic'

import { LocaleKey } from '../../type-patches/locales'

export type OwnProps = {
  title: LocaleKey
}

export const Tab = ({ children }: Jsx<OwnProps>) => <div className="">{children}</div>
