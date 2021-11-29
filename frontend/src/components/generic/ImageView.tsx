import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'

import { Jsx } from '../../shared/types/generic'
import { Html } from './Html'

type OwnProps = {
  image: string
  body: TFuncKey
  title?: TFuncKey
}

export const ImageView = ({ image, body, title, children }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  return (
    <Container fluid className="p-0">
      <Row>
        <Col
          xs
          style={{ maxHeight: 150 }}
          className="d-flex align-items-center justify-content-center"
        >
          <img src={image} alt="Everything went fine!" className="mw-100 mh-100" />
        </Col>
        <Col sm={8}>
          {title && <h3>{t(title)}</h3>}
          <Html localeKey={body} />
        </Col>
      </Row>
      {children}
    </Container>
  )
}
