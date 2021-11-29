import React from 'react'
import { TFuncKey } from 'react-i18next'

import robot from '../assets/success.svg'
import { Jsx } from '../shared/types/generic'
import { ImageView } from './generic/ImageView'

type OwnProps = {
  title: TFuncKey
  body: TFuncKey
}

export const SuccessView = ({ title, body, children }: Jsx<OwnProps>) => (
  <ImageView image={robot} body={body} title={title}>
    {children}
  </ImageView>
)
