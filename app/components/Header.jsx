import React from 'react'

// NextJS Components.
import Link from 'next/link'

// React Bootstrap Components.
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Moon as MoonIcon, Sun as SunIcon } from 'react-bootstrap-icons';

// Custom Components.
import ToggleSwitch from './ToggleSwitch';
import UserDropdown from './UserDropdown';

const Header = ({ user, isDarkMode, handleToggleIsDarkMode, handleLogOut }) => {
  const ThemeIcon = isDarkMode ? MoonIcon : SunIcon;

  return (
    <Navbar collapseOnSelect  expand={"sm"} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" as={Link}>Budgety</Navbar.Brand>

        {user && (
          <div className="d-flex align-items-center">
            <ToggleSwitch isActive={isDarkMode} handleOnChange={handleToggleIsDarkMode} className="mx-3">
              <ThemeIcon size="16" className="mx-2" />
            </ToggleSwitch>

            <UserDropdown handleLogOut={handleLogOut} />
          </div>
        )}
      </Container>
    </Navbar>
  )
}

export default Header;