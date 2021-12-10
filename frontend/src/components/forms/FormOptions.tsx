import clsx from 'clsx'
import { path } from 'ramda'
import React, { Children, HTMLAttributes, useEffect } from 'react'
import { Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { Palette } from '../../css/colors'
import { Scale, Tuple } from '../generic/Tuple'
import { ErrorInfo } from './ErrorInfo'

type OwnProps = {
  name: string
  values: string[]
} & HTMLAttributes<HTMLDivElement>

const ListGroupSx = styled(ListGroup)`
  &.invalid {
    > * {
      border: 1px solid ${Palette.errorBorder};
    }
  }
`

export const FormOptions = ({ name, values, children, ...props }: Jsx<OwnProps>) => {
  const { register, watch, clearErrors, formState } =
    useFormContext<{ [K in typeof name]: string }>()
  const val = watch(name)

  useEffect(clearErrors, [val])
  const error = path(name.split('.'), formState.errors)

  return (
    <div {...props}>
      <ListGroupSx className={clsx({ invalid: error })}>
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
      </ListGroupSx>
      <ErrorInfo name={name} />
    </div>
  )
}
