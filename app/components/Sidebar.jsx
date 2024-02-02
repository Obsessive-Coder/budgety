'use client'

import React from 'react'

// NextJS Components.
import Link from 'next/link'

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
    ArrowBarLeft as ArrowBarLeftIcon,
    ArrowBarRight as ArrowBarRightIcon,
    List as ListIcon,
    Moon as MoonIcon,
    MoonFill as MoonFillIcon
} from 'react-bootstrap-icons';

// Custom Components.
import ToggleSwitch from './ToggleSwitch';

const Sidebar = ({ isOpen, theme, handleSetTheme, handleToggleSidebar, handleLogOut }) => {
  return (
    <div className="position-relative">
        <Button
            variant="outline-primary"
            onClick={handleToggleSidebar}
            className="position-absolute start-100 px-0 border-0 text-secondary"
        >
            {isOpen ? (
                <ArrowBarLeftIcon size="28" />
            ) : (
                <ArrowBarRightIcon size="28" />
            )}
        </Button>

        {isOpen && (
            <Navbar expand={isOpen} className="bg-body-tertiary align-items-start">
                <Container fluid className="flex-column">
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand"
                        aria-labelledby="offcanvasNavbarLabel-expand"
                        placement="start"
                        onHide={handleToggleSidebar}
                    >
                        <Offcanvas.Body>
                            <Nav className="flex-column justify-content-center flex-grow-1 p-3">
                                {/* <Nav.Item className="px-2">
                                    <ToggleSwitch labelText={theme} handleOnChange={handleSetTheme}>
                                        {theme === 'dark' ? (
                                            <MoonFillIcon size="18" />
                                        ) : (
                                            <MoonIcon size="18" />
                                        )}
                                    </ToggleSwitch>
                                </Nav.Item> */}
                                <Link href="/" className='nav-link px-2'>Dashboard</Link>
                                <Link href="/profile" className='nav-link px-2'>Profile</Link>
                                <Link href="/about" className='nav-link px-2'>About</Link>
                                <Button variant="link" className='nav-link px-2 text-start' onClick={handleLogOut}>
                                    Logout
                                </Button>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        )}
    </div>
  )
}

export default Sidebar