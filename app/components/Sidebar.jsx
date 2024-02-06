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
    ArrowBarRight as ArrowBarRightIcon,
    X as XIcon
} from 'react-bootstrap-icons';

const navItems = ['dashboard', 'about'];

const Sidebar = ({ isOpen, pathname, handleToggleSidebar }) => {
  const pathnameIndex = navItems.indexOf(pathname.split('/')[1]);
  const activeNavKey = pathnameIndex >= 0 ? pathnameIndex : 0;

  const isSmallScreen = window.innerWidth >= 576;

  return (
    <div className="position-relative">
        {isOpen ? (
            <Navbar expand={isOpen} className={`bg-body-tertiary align-items-start h-100 ${isSmallScreen ? '' : 'position-absolute'}`}>
                <Container fluid className="flex-column">
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand"
                        aria-labelledby="offcanvasNavbarLabel-expand"
                        placement="start"
                        onHide={handleToggleSidebar}
                    >
                        <Offcanvas.Header className="d-block px-3 position-relative">    
                            <Button
                                variant="link"
                                onClick={handleToggleSidebar}
                                className="position-absolute top-0 end-0 rounded-0 p-0"
                            >
                                <XIcon size="28" />
                            </Button>
                        </Offcanvas.Header>
                        
                        <Offcanvas.Body className="px-3">
                            <Nav 
                                activeKey={activeNavKey}
                                className="flex-column justify-content-start"
                            >                                
                                {navItems.map((labelText, index) => (
                                    <Nav.Item key={`nav-item-${labelText}`}>
                                        <Nav.Link
                                            as={Link}
                                            eventKey={index}
                                            href={`/${labelText !== 'dashboard' ? labelText : ''}`}
                                            className="px-0 py-3 text-capitalize"
                                        >
                                            {labelText}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        ) : (
            <Button
                variant="link"
                onClick={handleToggleSidebar}
                className="position-absolute start-100 rounded-0 p-0 bg-body-tertiary"
            >
                <ArrowBarRightIcon size="28" />
            </Button>
        )}
    </div>
  )
}

export default Sidebar