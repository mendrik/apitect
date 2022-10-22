import { Jsx } from '~shared/types/generic'

import { ReactComponent as Question } from '../assets/question.svg'
import { LocaleKey } from '../type-patches/locales'
import { ImageView } from './generic/ImageView'

type OwnProps = {
  body: LocaleKey
}

export const QuestionView = ({ body, children }: Jsx<OwnProps>) => (
  <ImageView body={body} image={Question}>
    {children}
  </ImageView>
)
