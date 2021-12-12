import { useStore } from 'effector-react'
import React from 'react'
import { SelectInput } from '~forms/SelectInput'
import { $enumsStore } from '~stores/$enumsStore'

const Enum = () => {
  const enums = useStore($enumsStore)
  console.log(enums)

  return (
    <SelectInput label="modals.nodeSettings.enums.enumeration" name="enumeration">
      bls
    </SelectInput>
  )
}

export default Enum
