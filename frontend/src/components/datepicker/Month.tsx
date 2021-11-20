import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

type OwnProps = {
  month: Date
}

const Wrap = styled.div``
const Year = styled.ol``
const Months = styled.ol``

export const Month: FC<OwnProps> = ({ month, children }) => {
  const { t } = useTranslation()

  return (
    <Wrap>
      <Year>{t('app.name')}</Year>
      <Months>Months</Months>
    </Wrap>
  )
}
