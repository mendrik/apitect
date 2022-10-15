import { useStore, useStoreMap } from 'effector-react'
import { path } from 'ramda'
import { Value } from '~shared/types/domain/values/value'
import { $selectedArrayNode } from '~stores/$arrayStores'
import { $nodeSettings } from '~stores/$nodeSettingsStore'

type OwnProps = {
  values: Value[]
}

export const RenderedItem = ({ values }: OwnProps) => {
  const arrayNode = useStore($selectedArrayNode)
  const format: string = useStoreMap(
    $nodeSettings,
    path([arrayNode?.value.id ?? '', `displayFormat ${values.length}`])
  )!
  return <div>{format}</div>
}
