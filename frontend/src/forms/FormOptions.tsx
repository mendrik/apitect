import React, { FC } from 'react'
import { Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { Scale, Tuple } from '../components/generic/Tuple'

type OwnProps = {
  name: string
}

export const FormOptions: FC<OwnProps> = ({ name, children }) => {
  const { register, watch } = useFormContext<{ [K in typeof name]: number }>()
  const val = watch(name)
  return (
    <ListGroup>
      {React.Children.map(children, (child, idx) => (
        <ListGroupItem
          style={{
            backgroundColor: idx === val ? '#eaf3ff' : '#fafafa'
          }}
        >
          <Tuple first={Scale.CONTENT} second={Scale.MAX} gap={3}>
            <Form.Check
              type="radio"
              {...register(name, {
                setValueAs: v => parseInt(v, 10)
              })}
              value={idx}
            />
            {child}
          </Tuple>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
