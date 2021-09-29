import React, { FC, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { LogIn, LogOut } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { addParams } from '../../utils/url'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { userContext } from '../contexts/user'
import { Spinner } from '../forms/Spinner'
import usePromise from '../hooks/usePromise'
import { logout } from '../utils/api'

export const Navigation: FC = () => {
  const userState = useContext(userContext)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const doLogout = usePromise('doLogut', logout)

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
            <Button
              variant="outline-primary"
              onClick={() => doLogout.trigger().then(userState.trigger)}
            >
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
