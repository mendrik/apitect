import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Checkbox } from '../../../forms/Checkbox'
import { NumberInput } from '../../../forms/NumberInput'
import { ObjectSettings } from '../../../shared/types/forms/nodetypes/objectSettings'
import { HGrid } from '../../generic/HGrid'

const Number = () => {
  const { watch } = useFormContext<ObjectSettings>()

  return (
    <>
      <Checkbox name="integer" label={'modals.nodeSettings.number.integer'} className="mb-3" />
      <HGrid className="gap-2">
        <NumberInput label="modals.nodeSettings.number.min" name="min" />
        <NumberInput label="modals.nodeSettings.number.max" name="max" />
        <NumberInput label="modals.nodeSettings.number.step" name="step" />
      </HGrid>
    </>
  )
}

export default Number
