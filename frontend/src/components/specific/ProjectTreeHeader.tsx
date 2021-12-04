import { IconColumns, IconFileImport, IconFolderPlus, IconSettings, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { deleteNodeFx, newNodeFx, nodeSettingsFx } from '../../events/tree'
import { userSettingsFx } from '../../events/user'
import { $documentStore } from '../../stores/$documentStore'
import { $selectedNode } from '../../stores/$selectedNode'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader = () => {
  const { t } = useTranslation()
  const selectedNode = useStore($selectedNode)
  const document = useStore($documentStore)
  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div className="text-truncate editable">{document.name}</div>
      <HGrid>
        <WithTooltip tooltipText={t('tooltips.import')} shortcut="I">
          <Icon icon={IconFileImport} />
        </WithTooltip>
        <WithTooltip tooltipText={t('tooltips.deleteNode')} shortcut="Del">
          <Icon
            icon={IconTrash}
            onClick={() => deleteNodeFx(selectedNode!.value.id)}
            disabled={selectedNode == null}
          />
        </WithTooltip>
        <WithTooltip tooltipText={t('tooltips.createNode')} shortcut="N">
          <Icon icon={IconFolderPlus} onClick={() => newNodeFx(selectedNode?.value)} />
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
