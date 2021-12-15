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
        <NumberInput label="modals.nodeSettings.number.min" name="validation.min" />
        <NumberInput label="modals.nodeSettings.number.max" name="validation.max" />
      </HGrid>
      <Checkbox name="required" label={'modals.nodeSettings.required'} />
    </FieldSet>
    <FieldSet title="modals.nodeSettings.appearance">
      <HGrid className="gap-2">
        <NumberInput
          label="modals.nodeSettings.number.precision"
          name="display.precision"
          min={0}
          max={6}
          step={1}
        />
        <TextInput label="modals.nodeSettings.number.unit" name="display.unit" />
        <NumberInput label="modals.nodeSettings.number.step" name="display.step" min={0} />
      </HGrid>
    </FieldSet>
  </>
)

export default Number
