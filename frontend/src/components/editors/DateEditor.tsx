import clsx from 'clsx'
import { useStore } from 'effector-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Text, TextInput, useEditorTools } from '~hooks/specific/useEditorTools'
import { useDateFormat } from '~hooks/useDateFormat'
import { useDatepicker } from '~hooks/useDatepicker'
import { DateValue, getDateValidator } from '~shared/types/domain/values/dateValue'
import { DateDisplay, DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { Jsx } from '~shared/types/generic'

import { $nodeSettings } from '../../stores/$nodeSettingsStore'
import { Scale, Tuple } from '../generic/Tuple'
import { EditorProps } from '../specific/VisualValue'

export const DateEditor = ({ value, node, tag }: Jsx<EditorProps<DateValue>>) => {
  const nodeSettings = useStore($nodeSettings)
  const nodeSetting = nodeSettings[node.id] as DateSettings
  const validator = getDateValidator(nodeSetting)
  const format = useDateFormat(nodeSetting)
  const CalendarIcon = useDatepicker(`date-${tag}-${node.id}`)
  const formatStr = nodeSetting?.display === DateDisplay.Custom ? nodeSetting.format : 'dd.MM.yyyy'

  const { saveFn, error, keyMap, views } = useEditorTools(node, value, tag, validator)

  const form = useForm()

  return views.isDisplayView() ? (
    <Text tabIndex={0} onKeyDown={keyMap} onFocus={views.editView}>
      <span>{format(value?.value)}</span>
    </Text>
  ) : (
    <FormProvider {...form}>
      <Tuple
        first={Scale.MAX}
        second={Scale.CONTENT}
        style={{ position: 'relative', maxWidth: 200 }}
      >
        <TextInput
          type="text"
          className={clsx('editor', { invalid: error != null })}
          autoFocus
          placeholder={formatStr}
          onKeyDown={keyMap}
          onBlur={saveFn}
          defaultValue={format(value?.value)}
        />
        {CalendarIcon}
      </Tuple>
    </FormProvider>
  )
}
