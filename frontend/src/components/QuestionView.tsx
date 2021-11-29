import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { TFuncKey } from 'react-i18next'

import Question from '../assets/question.svg'
import { Jsx } from '../shared/types/generic'
import { Html } from './generic/Html'

type OwnProps = {
  body: TFuncKey
}

export const QuestionView = ({ body, children }: Jsx<OwnProps>) => (
  <Container fluid className="p-0">
    <Row>
      <Col
        xs
        style={{ maxHeight: 150 }}
        className="d-flex align-items-center justify-content-center"
      >
        <img src={Question} alt="Everything went fine!" className="mw-100 mh-100" />
      </Col>
      <Col sm={8}>
        <Html localeKey={body} />
      </Col>
    </Row>
    {children}
  </Container>
)
