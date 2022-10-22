import clsx from 'clsx'
import { TFuncKey } from 'i18next'
import { append, cond, path, pipe, propEq, remove, unless, when } from 'ramda'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import { HTMLAttributes, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Palette } from '../../css/colors'
import { keyIn, target } from '../../utils/eventUtils'
import { stopEvent } from '../../utils/events'
import { preventDefault } from '../../utils/preventDefault'
import { DeleteIcon } from '../generic/DeleteIcon'
import { ErrorInfo } from './ErrorInfo'

type OwnProps<T> = {
  name: string
  label: TFuncKey<'en-GB'>
  containerClasses?: string
  apply: (value: string) => T
  unapply: (tag: T) => string
} & HTMLAttributes<HTMLInputElement>

const StyledTagInput = styled.div`
  padding: 1.5rem 0.5rem 0.25rem 0.5rem;
  line-height: 1.25;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  min-height: 3rem;
  position: relative;

  &:focus-within > label,
  .tag ~ label,
  input:not(:invalid) ~ label {
    opacity: 0.65;
    transform: scale(0.85) translateY(-0.75rem) translateX(-0.15rem);
  }

  &.invalid {
    border: 1px solid ${Palette.errorBorder};
    &:focus-within {
      box-shadow: 0 0 0 0.25rem rgb(244 126 96 / 25%) !important;
    }
  }
`

const Input = styled.input`
  display: inline-block;
  flex: 1 1 auto;
  border: none;
  padding: 0.25rem 0;
  width: 30px;
`

export const TagInput = <T extends object>({
  name,
  label,
  containerClasses,
  apply,
  unapply,
  ...props
}: OwnProps<T>) => {
  const [currentName, setCurrentName] = useState<string>('')
  const inpRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation('en-GB')

  return (
    <Controller
      name={name}
      render={({ field, formState }) => {
        const onRemove = (index: number) => {
          field.onChange(remove(index, 1, field.value))
        }
        const onAdd = (tag: string) => {
          if (isNotNilOrEmpty(tag)) {
            field.onChange(append(apply(tag), field.value))
          }
        }

        const keyMap = cond([
          [keyIn('Backspace'), when(target.valueIs(''), () => onRemove(field.value.length - 1))],
          [
            keyIn('Enter'),
            unless(
              target.valueIs(''),
              preventDefault(() => {
                onAdd(currentName)
                setCurrentName('')
              })
            )
          ]
        ])

        const error = path(name.split('.'), formState.errors)

        return (
          <div className={containerClasses}>
            <StyledTagInput
              className={clsx('form-floating form-control focus-within', { invalid: error })}
              onClick={() => inpRef.current?.focus()}
            >
              {field.value.map((tag: T, idx: number) => (
                <TagInput.Tag key={idx} tag={unapply(tag)} onRemove={() => onRemove(idx)} />
              ))}
              <Input
                ref={inpRef}
                autoComplete="off"
                value={currentName}
                type="text"
                required
                onChange={pipe(target.value, setCurrentName)}
                onKeyDown={keyMap}
                onBlur={() => {
                  onAdd(currentName)
                  setCurrentName('')
                }}
                {...props}
              />
              <label>{t(label)}</label>
            </StyledTagInput>
            <ErrorInfo name={name} />
          </div>
        )
      }}
    />
  )
}

type TagProps = {
  tag: string
  onRemove: () => void
}

const Tag = styled.div`
  display: inline-flex;
  background-color: #e6e6e6;
  align-items: center;
  font-weight: 400;
  padding: 0.15rem 0.75rem;
  margin: 0.1rem 0;
  border-radius: 4px;
  gap: 5px;
  cursor: pointer;
  position: relative;

  &:focus {
    background-color: #d6d6d6;

    .delete {
      display: flex;
    }
  }

  &:last-child {
    margin-right: 0.25rem;
  }
`

TagInput.Tag = ({ tag, onRemove }: TagProps) => (
  <Tag
    onClick={pipe(stopEvent, target.focus)}
    className="tag"
    tabIndex={0}
    onKeyDown={when(propEq('key', 'Delete'), onRemove)}
  >
    <span className="label">{tag}</span>
    <DeleteIcon onClick={onRemove} />
  </Tag>
)
