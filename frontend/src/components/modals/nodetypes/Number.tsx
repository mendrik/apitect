import React from 'react'
import { Checkbox } from '~forms/Checkbox'
import { FieldSet } from '~forms/FieldSet'
import { NumberInput } from '~forms/NumberInput'
import { TextInput } from '~forms/TextInput'

import { HGrid } from '../../generic/HGrid'

const Number = () => (
  <>
    <FieldSet title="modals.nodeSettings.validation">
      <HGrid className="gap-2">
        <NumberInput label="modals.nodeSettings.number.min" name="min" />
        <NumberInput label="modals.nodeSettings.number.max" name="max" />
      </HGrid>
      <Checkbox name="required" label={'modals.nodeSettings.required'} />
    </FieldSet>
    <FieldSet title="modals.nodeSettings.appearance">
      <HGrid className="gap-2">
        <NumberInput
          label="modals.nodeSettings.number.precision"
          name="precision"
          min={0}
          max={6}
          step={1}
        />
        <TextInput label="modals.nodeSettings.number.unit" name="unit" />
        <NumberInput label="modals.nodeSettings.number.step" name="step" />
      </HGrid>
    </FieldSet>
  </>
)

export default Number
