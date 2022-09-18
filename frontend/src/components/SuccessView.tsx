import { TFuncKey } from 'react-i18next'
import { Jsx } from '~shared/types/generic'

import { ReactComponent as Success } from '../assets/success.svg'
import { ImageView } from './generic/ImageView'

type OwnProps = {
  title: TFuncKey
  body: TFuncKey
}

export const SuccessView = ({ title, body, children }: Jsx<OwnProps>) => (
  <ImageView image={Success} body={body} title={title}>
    {children}
  </ImageView>
)
