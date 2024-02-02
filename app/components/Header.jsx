import React from 'react'

// NextJS Components.
import Link from 'next/link'

// React Bootstrap Components.
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar collapseOnSelect  expand={"sm"} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" as={Link}>Budgety</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header;