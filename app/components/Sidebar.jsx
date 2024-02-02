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
} from 'react-bootstrap-icons';

// Custom Components.
import ToggleSwitch from './ToggleSwitch';

const navItems = ['dashboard', 'profile', 'about'];

const Sidebar = ({ isOpen, pathname, handleToggleSidebar, handleLogOut }) => {
  const pathnameIndex = navItems.indexOf(pathname.split('/')[1]);
  const activeNavKey = pathnameIndex >= 0 ? pathnameIndex : 0;
  
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
                        <Offcanvas.Header closeButton>
                            <ToggleSwitch />
                        </Offcanvas.Header>
                        
                        <Offcanvas.Body>
                            <Nav 
                                activeKey={activeNavKey}
                                className="flex-column justify-content-center flex-grow-1 p-3"
                            >
                                {navItems.map((labelText, index) => (
                                    <Nav.Item key={`nav-item-${labelText}`}>
                                        <Nav.Link
                                            as={Link}
                                            eventKey={index}
                                            href={`/${labelText !== 'dashboard' ? labelText : ''}`}
                                            className="text-capitalize"
                                        >
                                            {labelText}
                                        </Nav.Link>
                                    </Nav.Item>

                                    // <Link
                                    //     key={`nav-item-${labelText}`}
                                    //     href={`/${labelText !== 'dashboard' ? labelText : ''}`}
                                    //     className="nav-link px-2"
                                    // >
                                    //     {labelText}
                                    // </Link>
                                ))}
                                
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