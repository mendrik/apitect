import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Checkbox } from '../../../forms/Checkbox'
import { NumberInput } from '../../../forms/NumberInput'
import { ObjectSettings } from '../../../shared/types/forms/nodetypes/objectSettings'

const Number = () => {
  const { watch } = useFormContext<ObjectSettings>()
  const apiEndpoint = watch('apiEndpoint')

  return (
    <>
      <Checkbox name="integer" label={'modals.nodeSettings.number.integer'} className="mb-3" />
      <NumberInput label="modals.nodeSettings.number.min" name="number" />
    </>
  )
}

export default Number
