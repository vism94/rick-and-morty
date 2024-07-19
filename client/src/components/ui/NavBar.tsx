import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar(): JSX.Element {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/characters">Персонажи</Nav.Link>
          <Nav.Link href="/episodes">Эпизоды</Nav.Link>
          {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
