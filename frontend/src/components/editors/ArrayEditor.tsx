import { IconChevronLeft, IconChevronRight, IconDeviceFloppy } from '@tabler/icons'
import { useStore, useStoreMap } from 'effector-react'
import { path } from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { NodeId } from '~shared/types/domain/node'
import { ArrayValue } from '~shared/types/domain/values/arrayValue'
import { Jsx } from '~shared/types/generic'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $selectedValue } from '~stores/$valuesStore'

import { arrayItemCreateFx } from '../../events/array'
import { whenDefined } from '../../utils/eventUtils'
import { HGrid } from '../generic/HGrid'
import { SimpleIcon } from '../generic/SimpleIcon'
import { Scale, Tuple } from '../generic/Tuple'
import { EditorProps } from '../specific/VisualValue'

const EditorSx = styled.div`
  border-radius: 3px;
  padding: 2px 5px;
  height: 24px;
  line-height: 20px;
  white-space: nowrap;
  width: min-content;
`

export const ArrayEditor = ({ node, value, tag: columnTag }: Jsx<EditorProps<ArrayValue>>) => {
  const arrayNodeId: NodeId | undefined = useStoreMap($selectedArrayNode, path(['value', 'id']))
  const sv = useStore($selectedValue)

  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT}>
      <EditorSx tabIndex={0}>{value?.value ?? '0'} items</EditorSx>
      <div>
        {node.id === arrayNodeId && sv?.tag == columnTag && (
          <HGrid>
            <SimpleIcon icon={IconChevronLeft} />
            <SimpleIcon
              icon={IconDeviceFloppy}
              onClick={whenDefined(arrayNodeId, () =>
                arrayItemCreateFx({
                  arrayNodeId,
                  tag: columnTag
                })
              )}
            />
            <SimpleIcon icon={IconChevronRight} />
          </HGrid>
        )}
      </div>
    </Tuple>
  )
}
