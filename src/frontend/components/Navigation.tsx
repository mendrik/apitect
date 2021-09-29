import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { LogIn, LogOut } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { addParams } from '../../utils/url'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { Spinner } from '../forms/Spinner'
import { useLogout } from '../hooks/useLogout'

export const Navigation: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [userState, logout] = useLogout()
  return (
    <nav className="navbar navbar-light px-2 bg-light shadow-sm flex flex-row justify-content-start">
      <div className="flex-grow-1">
        <button type="button" className="navbar-brand btn">
          <Logo className="logo" style={{ height: 32 }} />
        </button>
      </div>
      <div className="flex-grow-0">
        {userState.data != null ? (
          <div className="d-flex flex-row gap-2 align-items-center">
            <span>{userState.data.name}</span>
            <Button variant="outline-primary" onClick={logout}>
              <Spinner promise="doLogout" spinnerDelay={100} />
              <LogOut className="icon-xs" /> {t('navbar.logout')}
            </Button>
          </div>
        ) : (
          <Button onClick={() => navigate(addParams({ modal: 'login' }))}>
            <Spinner promise="whoAmI" spinnerDelay={100} />
            <LogIn className="icon-xs" /> {t('navbar.login')}
          </Button>
        )}
      </div>
    </nav>
  )
}
