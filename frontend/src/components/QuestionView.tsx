import { TFuncKey } from 'react-i18next'
import { Jsx } from '~shared/types/generic'

import { ReactComponent as Question } from '../assets/question.svg'
import { ImageView } from './generic/ImageView'

type OwnProps = {
  body: TFuncKey
}

export const QuestionView = ({ body, children }: Jsx<OwnProps>) => (
  <ImageView body={body} image={Question}>
    {children}
  </ImageView>
)
