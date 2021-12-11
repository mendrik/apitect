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

const ListGroupItemSx = styled(ListGroupItem)`
  background-color: #eeeeee;

  &.open {
    background-color: white;
    box-shadow: 3px 0 0px 0px ${Palette.primary} inset;
  }
`

const ListGroupSx = styled(ListGroup)`
  position: relative;
  &.invalid:after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid ${Palette.errorBorder};
    border-radius: 4px;
    pointer-events: none;
  }
`

export const FormOptions = ({ name, values, children, ...props }: Jsx<OwnProps>) => {
  const { register, watch, clearErrors, formState } =
    useFormContext<{ [K in typeof name]: string }>()
  const val = watch(name)

  useEffect(clearErrors, [val, clearErrors])
  const error = path(name.split('.'), formState.errors)

  return (
    <div {...props}>
      <ListGroupSx className={clsx({ invalid: error })}>
        {Children.map(children, (child, idx) => (
          <ListGroupItemSx className={clsx({ open: values[idx] === val })}>
            <Tuple first={Scale.CONTENT} second={Scale.MAX} gap={3} className="align-items-start">
              <Form.Check
                type="radio"
                {...register(name, { required: true })}
                value={values[idx]}
                id={`${name}-${values[idx]}`}
              />
              {child}
            </Tuple>
          </ListGroupItemSx>
        ))}
      </ListGroupSx>
      <ErrorInfo name={name} />
    </div>
  )
}
