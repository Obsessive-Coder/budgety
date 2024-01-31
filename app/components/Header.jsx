import React from 'react'

// NextJS Components.
import Link from 'next/link'

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { List as ListIcon } from 'react-bootstrap-icons';

const Header = ({ user, pathname, handleLogOut, handleToggleSidebar }) => {
  let authPathname = pathname.split('/')[1]
  authPathname = authPathname === 'login' ? 'register' : 'login';
    

  return (
    <Navbar collapseOnSelect  expand={"sm"} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" as={Link}>Budgety</Navbar.Brand>

        <Nav className="justify-content-end">
          {user ? (
            <Button variant="link" className='nav-link text-start' onClick={handleLogOut}>
              Logout
            </Button>
          ) : (
            <Link href={`/${authPathname}`} className="nav-link text-capitalize">{authPathname}</Link>
          )}      
        </Nav>

        <Button
          variant="outline-primary"
          onClick={handleToggleSidebar}
          className="d-lg-none px-0 border-0 text-secondary"
        >
          <ListIcon size="28" />
        </Button>
      </Container>
    </Navbar>
  )
}

export default Header;