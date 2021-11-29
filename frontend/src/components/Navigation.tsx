import { IconKey, IconLogin, IconTags, IconUsers, IconWorldUpload } from '@tabler/icons'
import React, { useContext } from 'react'
import { Button, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { addParams } from 'shared/utils/url'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../assets/logo.svg'
import { userContext } from '../contexts/withUser'
import { Palette } from '../css/colors'
import { projectUserSettingsFx, tagsSettingsFx } from '../events/project'
import { useLogout } from '../hooks/useLogout'
import { Scale, Tuple } from './generic/Tuple'

const Item = styled(Nav.Item)`
  font-weight: 400;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  border-radius: 4px;
  cursor: pointer;

  span {
    color: ${Palette.iconText};
    white-space: nowrap;
  }

  &:hover {
    background-color: ${Palette.hover};
  }
`

const LogoText = styled.span`
  font-weight: 600;
  color: #86ab51;
  -webkit-text-stroke: 0.2pt black;
  text-shadow: 2px 2px 4px rgb(120 120 120 / 50%);
  font-size: 30px;
  padding: 0;
  margin: 0;
  line-height: 30px;
`

export const Navigation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const logout = useLogout()
  const { user } = useContext(userContext)

  return (
    <Navbar
      variant="light"
      expand="sm"
      className="px-2 bevel-bottom bevel-shadow"
      style={{ overflowX: 'clip', overflowY: 'visible' }}
    >
      <Navbar.Brand tabIndex={-1} className="me-auto p-0 user-select-none">
        <LogoText>{t('app.name')}</LogoText>
      </Navbar.Brand>
      {user != null && (
        <div className="d-flex align-items-center">
          <Item disabled>
            <Tuple first={Scale.CONTENT}>
              <IconWorldUpload className="icn" stroke={1} />
              <span>Publish</span>
            </Tuple>
          </Item>
          <Item onClick={projectUserSettingsFx}>
            <Tuple first={Scale.CONTENT}>
              <IconUsers className="icn" stroke={1} />
              <span>Users</span>
            </Tuple>
          </Item>
          <Item>
            <Tuple first={Scale.CONTENT}>
              <IconKey className="icn" stroke={1} />
              <span>API keys</span>
            </Tuple>
          </Item>
          <Item onClick={tagsSettingsFx}>
            <Tuple first={Scale.CONTENT}>
              <IconTags className="icn" stroke={1} />
              <span>Tags</span>
            </Tuple>
          </Item>
          <FormControl size="sm" type="search" placeholder="Search" aria-label="Search" />
        </div>
      )}
      <Nav>
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
