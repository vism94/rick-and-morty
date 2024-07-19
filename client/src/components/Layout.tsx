import React from 'react';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';

export default function Layout(): JSX.Element {
  return (
    <Container>
      <NavBar />
      <Outlet />
    </Container>
  );
}
