import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

type OwnProps = {
  prop: string
}

export const ProjectTreeHeader: FC<OwnProps> = ({ prop, children }) => {
  const { t } = useTranslation()

  return <div>Projec tree</div>
}
