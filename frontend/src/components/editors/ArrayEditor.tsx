import { IconChevronLeft, IconChevronRight, IconDeviceFloppy } from '@tabler/icons'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { ArrayValue } from '~shared/types/domain/values/arrayValue'
import { withoutBlanks as $ } from '~shared/utils/strings'
import { $itemsTotal } from '~stores/$arrayItemsStore'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $currentTag } from '~stores/$currentTag'
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

export const ArrayEditor = ({ node, tag: columnTag }: EditorProps<ArrayValue>) => {
  const tag = useStore($currentTag)
  const arrayNode = useStore($selectedArrayNode)
  const arrayNodeId = arrayNode?.value.id
  const sv = useStore($selectedValue)
  const total = useStore($itemsTotal)

  const showTotal = tag?.name === columnTag && arrayNodeId === node.id
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT}>
      <EditorSx tabIndex={0}>{$`${showTotal && total} items`}</EditorSx>
      <div>
        {node.id === arrayNodeId && sv?.tag == columnTag && (
          <HGrid>
            <SimpleIcon icon={IconChevronLeft} />
            <SimpleIcon
              icon={IconDeviceFloppy}
              onClick={whenDefined(arrayNodeId, () =>
                arrayItemCreateFx({ tag: columnTag, arrayNodeId })
              )}
            />
            <SimpleIcon icon={IconChevronRight} />
          </HGrid>
        )}
      </div>
    </Tuple>
  )
}
