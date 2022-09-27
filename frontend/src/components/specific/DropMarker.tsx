import styled from 'styled-components'

type OwnProps = {
  possibleDropLevels: number[]
}

const DropMarkerSx = styled.div`
  height: 5px;
  width: auto;
  background-color: rgb(200, 220, 255);
  border-radius: 3px;
`

export const DropMarker = ({ possibleDropLevels }: OwnProps) =>
  possibleDropLevels.length ? <DropMarkerSx /> : null
