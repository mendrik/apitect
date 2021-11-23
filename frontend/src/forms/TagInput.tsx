import clsx from 'clsx'
import { cond, pathEq, pathOr, pipe, propEq, unless, when } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { HTMLAttributes, useRef, useState } from 'react'
import { TFuncKey, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { DeleteIcon } from '../components/generic/DeleteIcon'
import { Fn, Jsx } from '../shared/types/generic'
import { preventDefault } from '../utils/preventDefault'
import { ErrorInfo } from './ErrorInfo'

type Tag = Record<'name', string>

type OwnProps<T extends Tag> = {
  name: string
  tags: T[]
  label: TFuncKey
  onAdd: (name: string) => void
  onRemove: (tag: T) => void
  containerClasses: string
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
  input:valid + label,
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

export const TagInput = <T extends Tag>({
  name,
  tags,
  label,
  onAdd,
  onRemove,
  children,
  containerClasses,
  ...props
}: Jsx<OwnProps<T>>) => {
  const [currentName, setCurrentName] = useState<string>('')
  const inpRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const keyMap = cond([
    [
      propEq('key', 'Backspace'),
      when(pathEq(['target', 'value'], ''), () => onRemove(tags[tags.length - 1]))
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
  ]) as Fn

  return (
    <StyledTagInput
      className={clsx('form-floating form-control focus-within', containerClasses)}
      onClick={() => inpRef.current?.focus()}
    >
      {mapIndexed(
        (tag, idx) => (
          <TagInput.Tag key={idx} tag={tag} onRemove={() => onRemove(tag)} />
        ),
        tags
      )}

      <Input
        ref={inpRef}
        required
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

type TagProps<T extends Tag> = {
  tag: T
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

TagInput.Tag = <T extends Record<'name', string>>({ tag, onRemove }: Jsx<TagProps<T>>) => {
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
      <span className="label">{tag.name}</span>
      <DeleteIcon onClick={onRemove} />
    </Tag>
  )
}
