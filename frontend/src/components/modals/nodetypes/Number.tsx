import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Checkbox } from '../../../forms/Checkbox'
import { ObjectSettings } from '../../../shared/types/forms/nodetypes/objectSettings'

const Number = () => {
  const { watch } = useFormContext<ObjectSettings>()
  const apiEndpoint = watch('apiEndpoint')

  return (
    <>
      <Checkbox name="integer" label={'modals.nodeSettings.number.integer'} />
    </>
  )
}

export default Number
