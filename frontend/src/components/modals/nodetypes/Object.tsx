import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Checkbox } from '../../../forms/Checkbox'
import { ObjectSettings } from '../../../shared/types/forms/nodetypes/objectSettings'

const Object = () => {
  const { watch } = useFormContext<ObjectSettings>()
  const apiEndpoint = watch('apiEndpoint')
  return (
    <>
      <Checkbox name="apiEndpoint" label={'modals.nodeSettings.object.apiEndpoint'} />
      {apiEndpoint && (
        <Checkbox name="individual" label={'modals.nodeSettings.object.individual'} />
      )}
    </>
  )
}

export default Object
