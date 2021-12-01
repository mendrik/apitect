import React, { Children, HTMLAttributes, useEffect } from 'react'
import { Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

import { Jsx } from '../../shared/types/generic'
import { Scale, Tuple } from '../generic/Tuple'
import { ErrorInfo } from './ErrorInfo'

type OwnProps = {
  name: string
  values: string[]
} & HTMLAttributes<HTMLDivElement>

export const FormOptions = ({ name, values, children, ...props }: Jsx<OwnProps>) => {
  const { register, watch, clearErrors } = useFormContext<{ [K in typeof name]: string }>()
  const val = watch(name)

  useEffect(clearErrors, [val])

  return (
    <div {...props}>
      <ListGroup>
        {Children.map(children, (child, idx) => {
          return (
            <ListGroupItem variant={values[idx] === val ? 'info' : 'light'}>
              <Tuple first={Scale.CONTENT} second={Scale.MAX} gap={3}>
                <Form.Check
                  type="radio"
                  {...register(name)}
                  value={values[idx]}
                  id={`${name}-${values[idx]}`}
                />
                {child}
              </Tuple>
            </ListGroupItem>
          )
        })}
      </ListGroup>
      <ErrorInfo name={name} />
    </div>
  )
}
