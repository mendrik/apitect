import React, { FC } from 'react'
import { PlusCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'

import { Scale, Tuple } from '../generic/Tuple'

type OwnProps = {
  prop?: string
}

export const ProjectTreeHeader: FC<OwnProps> = ({ prop, children }) => {
  const { t } = useTranslation()

  return (
    <Tuple first={Scale.MAX} second={Scale.CONTENT} gap={1}>
      <div>Project tree</div>
      <a href={''} className="d-block icon-xs">
        <PlusCircle className="d-block icon-xs" />
      </a>
    </Tuple>
  )
}
