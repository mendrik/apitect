import React from 'react'

import { TextInput } from '../../../forms/TextInput'

const String = () => {
  return (
    <>
      <TextInput
        name="name"
        label="form.fields.nodeName"
        type="text"
        autoFocus
        options={{ required: true }}
      />
      <TextInput
        name="validation.regexp"
        label="modals.nodeSettings.string.regexp"
        type="text"
        options={{ required: false }}
      />
    </>
  )
}

export default String
