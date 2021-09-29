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
    <nav className="navbar navbar-light px-2 bg-light shadow-sm flex flex-row justify-content-start align-items-center">
      <div className="flex-grow-1">
        <button type="button" className="navbar-brand btn">
          <Logo className="logo" style={{ height: 32 }} />
        </button>
      </div>
      <div>
        {userState.data != null ? (
          <div className="d-flex flex-row gap-2 align-items-center">
            <span>{userState.data.name}</span>
            <Button variant="outline-primary" onClick={logout} className="ps-2 d-flex">
              <Spinner promise="doLogout" spinnerDelay={100} />
              <div className="d-flex gap-1 align-items-center">
                <LogOut className="icon-xs ms-1" />
                <span>{t('navbar.logout')}</span>
              </div>
            </Button>
          </div>
        ) : (
          <Button onClick={() => navigate(addParams({ modal: 'login' }))} className="ps-2 d-flex">
            <Spinner promise="whoAmI" spinnerDelay={100} />
            <div className="d-flex gap-1 align-items-center">
              <LogIn className="icon-xs ms-1" />
              <span>{t('navbar.login')}</span>
            </div>
          </Button>
        )}
      </div>
    </nav>
  )
}
