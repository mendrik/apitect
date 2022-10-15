import { IconCirclePlus, IconColumns, IconSettings, IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { useConfirmation } from '~hooks/useConfirmation'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $documentStore } from '~stores/$documentStore'
import { $canCreateNode, $currentNode } from '~stores/$selectedNode'

import { renameProjectFx } from '../../events/project'
import { deleteNodeFx, newNodeFx, nodeSettingsFx } from '../../events/tree'
import { userSettingsFx } from '../../events/user'
import { EditableText } from '../generic/EditableText'
import { HGrid } from '../generic/HGrid'
import { Icon } from '../generic/Icon'
import { Scale, Tuple } from '../generic/Tuple'
import { WithTooltip } from '../generic/WithTooltip'

export const ProjectTreeHeader = () => {
  const { t } = useTranslation()
  const selectedNode = useStore($currentNode)
  const selectedArrayNode = useStore($selectedArrayNode)
  const canCreateNode = useStore($canCreateNode)
  const document = useStore($documentStore)

  const [DeleteModal, confirmDelete] = useConfirmation(
    'common.questions.delete',
    () => selectedNode && deleteNodeFx(selectedNode.value.id)
  )

  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <EditableText editAction={renameProjectFx}>
        <div className="text-truncate">{document.name}</div>
      </EditableText>
      <HGrid>
        <WithTooltip tooltipText={t('tooltips.deleteNode')} shortcut="Del">
          <Icon icon={IconTrash} onClick={confirmDelete} disabled={selectedNode == null} />
        </WithTooltip>
        <WithTooltip tooltipText={t('tooltips.createNode')} shortcut="N">
          <Icon
            icon={IconCirclePlus}
            disabled={!canCreateNode}
            onClick={() => newNodeFx(selectedNode)}
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
      <DeleteModal />
    </Tuple>
  )
}
