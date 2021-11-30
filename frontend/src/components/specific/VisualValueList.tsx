import React from 'react'
import { useTranslation } from 'react-i18next'

import { TreeNode } from '../../shared/algebraic/treeNode'
import { Node } from '../../shared/types/domain/node'
import { Jsx } from '../../shared/types/generic'

type OwnProps = {
  tag?: string
  nodeList: TreeNode<Node>[]
}

export const VisualValueList = ({ tag, nodeList }: Jsx<OwnProps>) => {
  const { t } = useTranslation()

  return <div>{t('app.name')}</div>
}
