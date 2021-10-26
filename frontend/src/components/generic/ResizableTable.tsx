import { pathOr } from 'ramda'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export type ColumnData = {
  title: string
}

type OwnProps = {
  columns: ColumnData[]
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${pathOr(1, ['children', 'length'])}, minmax(270px, 1fr));
  grid-template-rows: 32px;
  grid-auto-rows: 20px;
  align-items: stretch;
`

const Header = styled.div`
  display: block;
`

const Column = styled.div`
  display: block;
`

const Row = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ResizableTable: FC<OwnProps> = ({ columns, children }) => {
  const { t } = useTranslation()

  const data = useMemo(() => new Array(30).map((_, row) => <Row key={row}>{row}</Row>), [])

  return (
    <StyledGrid>
      {columns.map((column, col) => (
        <Column key={col}>
          <Header className="px-2 py-1 bevel-bottom">
            <Row>{column.title}</Row>
          </Header>
          {data}
        </Column>
      ))}
    </StyledGrid>
  )
}
