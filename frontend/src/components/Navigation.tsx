import { IconDownload, IconLogin, IconTags, IconTrees, IconWorldUpload } from '@tabler/icons'
import { useStore } from 'effector-react'
import React from 'react'
import { Button, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useLogout } from '~hooks/useLogout'
import { addParams } from '~shared/utils/url'

import { Palette } from '../css/colors'
import { enumsFx, projectUserSettingsFx, tagsSettingsFx } from '../events/project'
import { $user } from '../stores/$userStore'
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
  margin-left: 0.25rem;
  color: #999;
`

export const Navigation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const logout = useLogout()
  const user = useStore($user)

  return (
    <Navbar
      variant="light"
      expand="sm"
      className="px-2 bevel-bottom bevel-shadow"
      style={{ overflowX: 'clip', overflowY: 'visible' }}
    >
      <Navbar.Brand
        tabIndex={-1}
        className="me-auto p-0 user-select-none"
        style={{ marginTop: -3 }}
      >
        <IconTrees stroke={1} width={24} />
        <LogoText>
          <span style={{ color: 'black' }}>api</span>tect
        </LogoText>
      </Navbar.Brand>
      {user != null && (
        <div className="d-flex align-items-center">
          <Item disabled>
            <Tuple first={Scale.CONTENT}>
              <IconWorldUpload className="icn" stroke={1} />
              <span>Publish</span>
            </Tuple>
          </Item>
          <Item>
            <Tuple first={Scale.CONTENT}>
              <IconDownload className="icn" stroke={1} />
              <span>Download</span>
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
            <NavDropdown.Item>Import Json</NavDropdown.Item>
            <NavDropdown.Item>Api Keys</NavDropdown.Item>
            <NavDropdown.Item onClick={() => projectUserSettingsFx()}>
              Project users
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => enumsFx()}>Enumerations</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Profile</NavDropdown.Item>
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
