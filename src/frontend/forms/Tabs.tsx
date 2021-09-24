import clsx from 'clsx'
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
  return (
    <tabContext.Provider value={{ activeTab }}>
      <ul className="nav nav-tabs">
        {Children.map(children, (child, i) => (
          <li className="nav-item">
            <button
              type="button"
              className={clsx('nav-link', { active: i === activeTab })}
              aria-current="page"
            >
              {t(child.props.title)}
            </button>
          </li>
        ))}
      </ul>
      {children[activeTab]}
    </tabContext.Provider>
  )
}
