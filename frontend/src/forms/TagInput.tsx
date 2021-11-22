import { IconCircleX } from '@tabler/icons'
import clsx from 'clsx'
import { cond, pathEq, pathOr, pipe, propEq, unless, when } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { HTMLAttributes, useRef, useState } from 'react'
import { TFuncKey } from 'react-i18next'
import styled from 'styled-components'

import { Fn, Jsx } from '../shared/types/generic'
import { preventDefault } from '../utils/preventDefault'

type Tag = Record<'name', string>

type OwnProps<T extends Tag> = {
  name: string
  tags: T[]
  label: TFuncKey
  onAdd: (name: string) => void
  onRemove: (tag: T) => void
} & HTMLAttributes<HTMLInputElement>

const StyledTagInput = styled.div`
  padding: 0.5rem;
  line-height: 1.25;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  min-height: 3rem;
`

const InputWrap = styled.div`
  display: inline-block;
  flex: 1 1 auto;

  > input {
    border: none;
    height: 100%;
    min-width: 100%;
    width: 30px;
  }
`

export const TagInput = <T extends Tag>({
  tags,
  onAdd,
  onRemove,
  children,
  ...props
}: Jsx<OwnProps<T>>) => {
  const [currentName, setCurrentName] = useState<string>('')
  const inpRef = useRef<HTMLInputElement>(null)

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
      className={clsx('tags-container form-control focus-within', { focus })}
      onClick={() => inpRef.current?.focus()}
    >
      {mapIndexed(
        (tag, idx) => (
          <TagInput.Tag key={idx} tag={tag} onRemove={() => onRemove(tag)} />
        ),
        tags
      )}

      <InputWrap>
        <input
          ref={inpRef}
          autoComplete="off"
          value={currentName}
          type="text"
          onChange={pipe(pathOr('', ['target', 'value']), setCurrentName)}
          onKeyDown={keyMap}
          {...props}
        />
      </InputWrap>
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
  padding: 0.25rem 0.75rem;
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

const Delete = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fefefe;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;

  &:hover {
    background-color: #efefef;
  }
`

TagInput.Tag = <T extends Record<'name', string>>({ tag, onRemove }: Jsx<TagProps<T>>) => {
  return (
    <Tag
      onClick={preventDefault(ev => {
        ev.stopPropagation()
        ev.target.focus()
      })}
      tabIndex={0}
      onKeyDown={when(propEq('key', 'Delete'), onRemove)}
    >
      <span className="label">{tag.name}</span>
      <Delete onClick={onRemove} className="delete">
        <IconCircleX stroke={1} width={16} height={16} />
      </Delete>
    </Tag>
  )
}
