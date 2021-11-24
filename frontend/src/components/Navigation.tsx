import { IconEyeglass, IconLogin, IconTag, IconUsers } from '@tabler/icons'
import { useStore } from 'effector-react'
import React, { useContext } from 'react'
import { Button, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { addParams } from 'shared/utils/url'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../assets/logo.svg'
import { userContext } from '../contexts/withUser'
import { Palette } from '../css/colors'
import { useLogout } from '../hooks/useLogout'
import $appStore from '../stores/$appStore'
import { HGrid } from './generic/HGrid'
import { Scale, Tuple } from './generic/Tuple'

const Item = styled(Nav.Item)`
  font-weight: 400;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  border-radius: 4px;
  cursor: pointer;

  span {
    color: ${Palette.iconText};
  }

  &:hover {
    background-color: ${Palette.hover};
  }
`

export const Navigation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const logout = useLogout()
  const { user } = useContext(userContext)
  const { document } = useStore($appStore)
  return (
    <Navbar variant="light" expand="sm" className="px-2 bevel-bottom bevel-shadow w-auto">
      <Navbar.Brand href="#home" tabIndex={-1}>
        <Logo className="logo" style={{ height: 32, marginTop: -8 }} />
      </Navbar.Brand>
      {user != null && (
        <Tuple first={Scale.MAX} second={Scale.CONTENT} style={{ overflow: 'hidden' }}>
          <div>{document.name}</div>
          <Tuple>
            <HGrid>
              <Item>
                <Tuple first={Scale.CONTENT}>
                  <IconEyeglass className="icn" stroke={1} />
                  <span>View</span>
                </Tuple>
              </Item>
              <Item>
                <Tuple first={Scale.CONTENT}>
                  <IconUsers className="icn" stroke={1} />
                  <span>Users</span>
                </Tuple>
              </Item>
              <Item>
                <Tuple first={Scale.CONTENT}>
                  <IconTag className="icn" stroke={1} />
                  <span>Tags</span>
                </Tuple>
              </Item>
            </HGrid>
            <FormControl size="sm" type="search" placeholder="Search" aria-label="Search" />
          </Tuple>
        </Tuple>
      )}
      <Nav className="ms-auto">
        {user != null ? (
          <NavDropdown title={user.name} align="end">
            <NavDropdown.Item>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>{t('navbar.logout')}</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Button onClick={() => navigate(addParams({ modal: 'login' }))} className="ps-2 d-flex">
            <div className="d-flex gap-1 align-items-center">
              <IconLogin className="icon-xs ms-1" />
              <span>{t('navbar.login')}</span>
            </div>
          </Button>
        )}
      </Nav>
    </Navbar>
  )
}
