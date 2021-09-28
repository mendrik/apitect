import React, { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'

import { ReactComponent as SuccessSvg } from '../assets/success.svg'
import { Html } from './Html'

type OwnProps = {
  title: TFuncKey
  body: TFuncKey
}

export const SuccessView: FC<OwnProps> = ({ title, body, children }) => {
  const { t } = useTranslation()
  return (
    <Container fluid>
      <Row>
        <Col xs style={{ maxHeight: 150 }} className="d-flex align-items-center">
          <SuccessSvg />
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
