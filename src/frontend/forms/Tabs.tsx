import clsx from 'clsx'
import React, { Children, createContext, FC, HTMLAttributes, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { OwnProps as TabProps } from './Tab'

type TabContext = {
  activeTab?: number
}

const tabContext = createContext<TabContext>({ activeTab: 0 })

type OwnProps = {
  activeTab?: number
  children: ReadonlyArray<ReactElement<TabProps>>
} & HTMLAttributes<HTMLDivElement>

export const Tabs: FC<OwnProps> = ({ activeTab = 0, children, ...props }) => {
  const { t } = useTranslation()
  return (
    <div {...props}>
      <tabContext.Provider value={{ activeTab }}>
        <ul className="nav nav-tabs mb-4">
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
    </div>
  )
}
