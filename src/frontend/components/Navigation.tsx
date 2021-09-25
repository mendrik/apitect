import React, { FC } from 'react'
import { LogIn } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { addParams } from '../../utils/url'
import { ReactComponent as Logo } from '../assets/logo.svg'

export const Navigation: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-light px-2 bg-light shadow-sm flex flex-row justify-content-start">
      <div className="flex-grow-1">
        <button type="button" className="navbar-brand btn">
          <Logo className="logo" style={{ height: 32 }} />
        </button>
      </div>
      <div className="flex-grow-0">
        <button
          type="button"
          className="btn"
          onClick={() => navigate(addParams({ modal: 'login' }))}
        >
          <LogIn className="icon-xs" /> {t('navbar.login')}
        </button>
      </div>
    </nav>
  )
}
