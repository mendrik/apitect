import React, { FC } from 'react'
import { Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

import { Scale, Tuple } from '../components/generic/Tuple'

type OwnProps = {
  name: string
}

export const FormOptions: FC<OwnProps> = ({ name, children }) => {
  const { register } = useFormContext()
  return (
    <ListGroup>
      {React.Children.map(children, child => (
        <ListGroupItem>
          <Tuple first={Scale.CONTENT} second={Scale.MAX} gap={3}>
            <Form.Check type="radio" {...register(name)} />
            {child}
          </Tuple>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
