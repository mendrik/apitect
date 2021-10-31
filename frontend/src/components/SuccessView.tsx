import React, { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'

import robot from '../assets/success.png'
import { Html } from './generic/Html'

type OwnProps = {
  title: TFuncKey
  body: TFuncKey
}

export const SuccessView: FC<OwnProps> = ({ title, body, children }) => {
  const { t } = useTranslation()
  return (
    <Container fluid className="p-0">
      <Row>
        <Col xs style={{ maxHeight: 150 }} className="d-flex align-items-center">
          <img src={robot} alt="Everything went fine!" className="mw-100" />
        </Col>
        <Col sm={8}>
          <h3>{t(title)}</h3>
          <Html localeKey={body} />
        </Col>
      </Row>
      {children}
    </Container>
  )
}
