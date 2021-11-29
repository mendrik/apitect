import React from 'react'
import { TFuncKey } from 'react-i18next'

import Question from '../assets/question.svg'
import { Jsx } from '../shared/types/generic'
import { ImageView } from './generic/ImageView'

type OwnProps = {
  body: TFuncKey
}

export const QuestionView = ({ body, children }: Jsx<OwnProps>) => (
  <ImageView body={body} image={Question}>
    {children}
  </ImageView>
)
