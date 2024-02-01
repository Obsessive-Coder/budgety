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

const Sidebar = ({ isOpen, handleToggleSidebar, handleLogOut }) => {
  return (
    <Navbar expand={isOpen} className="bg-body-tertiary">
        <Container fluid className="flex-column">
            <Navbar.Offcanvas
                id="offcanvasNavbarLabel-expand"
                aria-labelledby="offcanvasNavbarLabel-expand"
                placement="start"
                onHide={handleToggleSidebar}
            >
                <Offcanvas.Body>
                    <Nav className="flex-column justify-content-center flex-grow-1 p-3">
                        <Link href="/" className='nav-link'>Dashboard</Link>
                        <Link href="/profile" className='nav-link'>Profile</Link>
                        <Link href="/about" className='nav-link'>About</Link>
                        <Button variant="link" className='nav-link text-start' onClick={handleLogOut}>
                            Logout
                        </Button>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
  )
}

export default Sidebar