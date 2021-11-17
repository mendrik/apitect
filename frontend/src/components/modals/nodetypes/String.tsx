import React from 'react'

import { Checkbox } from '../../../forms/Checkbox'
import { TextInput } from '../../../forms/TextInput'

const String = () => {
  return (
    <fieldset className="fieldset" title="Validation">
      <TextInput
        name="validation.regexp"
        label="modals.nodeSettings.string.regexp"
        type="text"
        options={{ required: false }}
      />
      <Checkbox name="validation.email" label="modals.nodeSettings.string.email" />
    </fieldset>
  )
}

export default String
