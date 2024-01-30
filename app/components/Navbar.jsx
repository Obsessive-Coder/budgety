'use client'

import React from 'react'

// NextJS Components.
import Link from 'next/link'

// React Bootstrap Components.
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const MainNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
        <Container fluid>
            <Navbar.Brand href="/" as={Link}>
                Budgety
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Offcanvas
                id="offcanvasNavbarLabel-expand"
                aria-labelledby="offcanvasNavbarLabel-expand"
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel-expand">
                        <Navbar.Brand href="/" as={Link}>
                            Budgety
                        </Navbar.Brand>
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Nav className="justify-content-center flex-grow-1 pe-3">
                        <Link href="/" className='nav-link'>Dashboard</Link>
                        <Link href="/profile" className='nav-link'>Profile</Link>
                        <Link href="/about" className='nav-link'>About</Link>
                    </Nav>

                    <Nav className="justify-content-end pe-3">
                        <Link href="/login" className='nav-link'>Login</Link>
                        <Link href="/register" className='nav-link'>Register</Link>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
  )
}

export default MainNavbar