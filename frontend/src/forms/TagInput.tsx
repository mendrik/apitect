import { IconCircleX } from '@tabler/icons'
import clsx from 'clsx'
import { cond, pathOr, pipe, propEq } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { useState } from 'react'
import { TFuncKey } from 'react-i18next'
import styled from 'styled-components'

import { Icon } from '../components/generic/Icon'
import { useFocusMonitor } from '../hooks/useFocusMonitor'
import { Fn, Jsx } from '../shared/types/generic'
import { preventDefault } from '../utils/preventDefault'

type Tag = Record<'name', string>

type OwnProps<T extends Tag> = {
  name: string
  tags: T[]
  label: TFuncKey
  onAdd: (name: string) => void
  onRemove: (tag: T) => void
}

const StyledTagInput = styled.div`
  padding: 1rem 0.75rem;
  line-height: 1.25;
`

const TagList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
`

const Input = styled.input``

export const TagInput = <T extends Tag>({ tags, onAdd, onRemove }: Jsx<OwnProps<T>>) => {
  const [currentName, setCurrentName] = useState<string>('')
  const [inpRef, focus] = useFocusMonitor<HTMLInputElement>()

  const keyMap = cond([
    [propEq('key', 'Backspace'), () => void 0],
    [propEq('key', 'Delete'), () => void 0],
    [
      propEq('key', 'Enter'),
      preventDefault(() => {
        onAdd(currentName)
        setCurrentName('')
      })
    ]
  ]) as Fn

  return (
    <StyledTagInput
      className={clsx('tags-container form-control', { focus })}
      onClick={() => inpRef.current?.focus()}
    >
      <TagList>
        {mapIndexed(
          (tag, idx) => (
            <TagInput.Tag key={idx} tag={tag} onRemove={() => onRemove(tag)} />
          ),
          tags
        )}
      </TagList>

      <input
        ref={inpRef}
        className="input"
        placeholder="new tag..."
        value={currentName}
        type="text"
        onChange={pipe(pathOr('', ['target', 'value']), setCurrentName)}
        onKeyDown={keyMap}
      />
    </StyledTagInput>
  )
}

type TagProps<T extends Tag> = {
  tag: T
  onRemove: () => void
}

const Tag = styled.li`
  display: inline-flex;
  background-color: #e6e6e6;
  align-items: center;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
  border-radius: 4px;
  &:last-child {
    margin-right: 0.25rem;
  }
`

TagInput.Tag = <T extends Record<'name', string>>({ tag, onRemove }: Jsx<TagProps<T>>) => {
  return (
    <Tag>
      <span className="label">{tag.name}</span>
      <Icon icon={IconCircleX} onClick={onRemove} />
    </Tag>
  )
}
