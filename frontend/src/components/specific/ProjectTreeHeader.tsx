import { IconCirclePlus, IconColumns, IconSettings, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { $documentStore } from '~stores/$documentStore'
import { $canCreateNode, $currentNode } from '~stores/$selectedNode'

import { deleteNodeFx, newNodeFx, nodeSettingsFx } from '../../events/tree'
import { userSettingsFx } from '../../events/user'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader = () => {
  const { t } = useTranslation()
  const selectedNode = useStore($currentNode)
  const canCreateNode = useStore($canCreateNode)
  const document = useStore($documentStore)

  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate editable">{document.name}</div>
      <HGrid>
        <WithTooltip tooltipText={t('tooltips.deleteNode')} shortcut="Del">
          <Icon
            icon={IconTrash}
            onClick={() => deleteNodeFx(selectedNode!.value.id)}
            disabled={selectedNode == null}
          />
        </WithTooltip>
        <WithTooltip tooltipText={t('tooltips.createNode')} shortcut="N">
          <Icon
            icon={IconCirclePlus}
            disabled={!canCreateNode}
            onClick={() => newNodeFx(selectedNode?.value)}
          />
        </WithTooltip>
        <WithTooltip tooltipText={t('tooltips.nodeSettings')} shortcut="Enter">
          <Icon
            icon={IconSettings}
            disabled={selectedNode == null}
            onClick={() => nodeSettingsFx(selectedNode!.value.id)}
          />
        </WithTooltip>
        <WithTooltip tooltipText={t('tooltips.tags')}>
          <Icon icon={IconColumns} onClick={() => userSettingsFx()} />
        </WithTooltip>
      </HGrid>
    </Tuple>
  )
}
