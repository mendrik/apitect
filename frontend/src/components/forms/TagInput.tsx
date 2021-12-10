import clsx from 'clsx'
import { append, cond, pathEq, pathOr, pipe, propEq, unless, when } from 'ramda'
import React, { HTMLAttributes, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { preventDefault } from '../../utils/preventDefault'
import { DeleteIcon } from '../generic/DeleteIcon'
import { ErrorInfo } from './ErrorInfo'

type OwnProps<T> = {
  name: string
  label: TFuncKey
  containerClasses?: string
  apply: (name: string) => T
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
  .tag ~ label {
    opacity: 0.65;
    transform: scale(0.85) translateY(-0.75rem) translateX(-0.15rem);
  }
`

const Input = styled.input`
  display: inline-block;
  flex: 1 1 auto;
  border: none;
  padding: 0.25rem 0;
  width: 30px;
`

export const TagInput = <T extends any>({
  name,
  label,
  containerClasses,
  apply,
  unapply,
  ...props
}: Jsx<OwnProps<T>>) => {
  const { getValues, setValue } = useForm<Record<typeof name, T[]>>()
  const [currentName, setCurrentName] = useState<string>('')
  const inpRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const tags = getValues(name) ?? []

  console.log(tags)

  const onRemove = (index: number) => setValue(name, tags.splice(index, 1) as any)
  const onAdd = (tag: string) => setValue(name, append(apply(tag), tags) as any)

  const keyMap = cond([
    [
      propEq('key', 'Backspace'),
      when(pathEq(['target', 'value'], ''), () => onRemove(tags.length - 1))
    ],
    [
      propEq('key', 'Enter'),
      unless(
        pathEq(['target', 'value'], ''),
        preventDefault(() => {
          onAdd(currentName)
          setCurrentName('')
        })
      )
    ]
  ])

  return (
    <StyledTagInput
      className={clsx('form-floating form-control focus-within', containerClasses)}
      onClick={() => inpRef.current?.focus()}
    >
      {tags.map((tag, idx) => (
        <TagInput.Tag key={idx} tag={unapply(tag)} onRemove={() => onRemove(idx)} />
      ))}
      <Input
        ref={inpRef}
        autoComplete="off"
        value={currentName}
        type="text"
        onChange={pipe(pathOr('', ['target', 'value']), setCurrentName)}
        onKeyDown={keyMap}
        {...props}
      />
      <label>{t(label)}</label>
      <ErrorInfo name={name} />
    </StyledTagInput>
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

TagInput.Tag = ({ tag, onRemove }: Jsx<TagProps>) => {
  return (
    <Tag
      onClick={preventDefault(ev => {
        ev.stopPropagation()
        ev.target.focus()
      })}
      className="tag"
      tabIndex={0}
      onKeyDown={when(propEq('key', 'Delete'), onRemove)}
    >
      <span className="label">{tag}</span>
      <DeleteIcon onClick={onRemove} />
    </Tag>
  )
}
