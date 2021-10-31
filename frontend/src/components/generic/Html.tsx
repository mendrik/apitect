import React, { HTMLAttributes } from 'react'
import { TFuncKey, useTranslation } from 'react-i18next'

/**
 * creating styled component dynamically gives a warning, so let's pre-create some
 * components as a map. Add any tag that you might need to this array
 */
const supportedTags = ['div', 'p', 'ul', 'span', 'strong']

interface OwnProps<T extends HTMLElement> extends HTMLAttributes<T> {
  localeKey: TFuncKey
  as?: typeof supportedTags[number]
  options?: Record<string, any>
}

export const Html: <T extends HTMLElement>(p: OwnProps<T>) => React.ReactElement<OwnProps<T>> = ({
  localeKey,
  as: Tag = 'div',
  options = {},
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <Tag
      dangerouslySetInnerHTML={{
        __html: t(localeKey, {
          interpolation: { escapeValue: false },
          ...options
        })
      }}
      {...rest}
    />
  )
}
