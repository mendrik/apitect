import clsx from 'clsx'
import React, { Children, createContext, HTMLAttributes, ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Jsx } from '../../shared/types/generic'
import { OwnProps as TabProps } from './Tab'

type TabContext = {
  activeTab?: number
}

const tabContext = createContext<TabContext>({ activeTab: 0 })

type OwnProps = {
  initialTab?: number
  children: ReadonlyArray<ReactElement<TabProps>>
} & HTMLAttributes<HTMLDivElement>

export const Tabs = ({ initialTab = 0, children, ...props }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const [activeTab, setTab] = useState(initialTab)
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
                onClick={() => setTab(i)}
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
