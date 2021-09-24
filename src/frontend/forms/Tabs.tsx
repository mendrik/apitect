import React, { Children, createContext, FC, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { OwnProps as TabProps } from './Tab'

type TabContext = {
  activeTab?: number
}

const tabContext = createContext<TabContext>({ activeTab: 0 })

type OwnProps = {
  activeTab?: number
  children: ReadonlyArray<ReactElement<TabProps>>
}

export const Tabs: FC<OwnProps> = ({ activeTab = 0, children }) => {
  const { t } = useTranslation()
  console.log(activeTab, children)
  return (
    <tabContext.Provider value={{ activeTab }}>
      <ul className="nav nav-tabs">
        {Children.map(children, child => (
          <li className="nav-item">
            <button type="button" className="nav-link active" aria-current="page">
              {t(child.props.title)}
            </button>
          </li>
        ))}
      </ul>
      {children[activeTab]}
    </tabContext.Provider>
  )
}
