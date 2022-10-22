import { Jsx } from '~shared/types/generic'

import { ReactComponent as Success } from '../assets/success.svg'
import { LocaleKey } from '../type-patches/locales'
import { ImageView } from './generic/ImageView'

type OwnProps = {
  title: LocaleKey
  body: LocaleKey
}

export const SuccessView = ({ title, body, children }: Jsx<OwnProps>) => (
  <ImageView image={Success} body={body} title={title}>
    {children}
  </ImageView>
)
