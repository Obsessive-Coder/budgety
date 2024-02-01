import React from 'react'

// NextJS Components.
import Link from 'next/link'

// React Bootstrap Components.
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { List as ListIcon } from 'react-bootstrap-icons';

const Header = ({ pathname, handleToggleSidebar }) => {
  let authPathname = pathname.split('/')[1]
  authPathname = authPathname === 'login' ? 'register' : 'login';
    

  return (
    <Navbar collapseOnSelect  expand={"sm"} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" as={Link}>Budgety</Navbar.Brand>

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