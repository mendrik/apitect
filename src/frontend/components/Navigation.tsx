import { useStore } from 'effector-react'
import React, { FC, useContext } from 'react'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LogIn } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { addParams } from '../../shared/utils/url'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { userContext } from '../contexts/user'
import { useLogout } from '../hooks/useLogout'
import appState from '../stores/appState'

export const Navigation: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const logout = useLogout()
  const { user } = useContext(userContext)
  const { document } = useStore(appState)
  return (
    <Navbar variant="light" expand="sm" className="px-2 shadow-lg">
      <Navbar.Brand href="#home">
        <Logo className="logo" style={{ height: 32, marginTop: -8 }} />
      </Navbar.Brand>
      <Navbar.Text className="editable">{document?.name}</Navbar.Text>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="ml-auto">
          {user != null ? (
            <NavDropdown title={user.name} align="end">
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
