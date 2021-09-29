import React, { FC } from 'react'
import { Button, NavDropdown } from 'react-bootstrap'
import { LogIn } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { addParams } from '../../utils/url'
import { ReactComponent as Logo } from '../assets/logo.svg'
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
          <NavDropdown id="nav-dropdown-dark-example" title={userState.data.name}>
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>{t('navbar.logout')}</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Button onClick={() => navigate(addParams({ modal: 'login' }))} className="ps-2 d-flex">
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
