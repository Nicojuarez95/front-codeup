import React from 'react';
import { Container, Navbar, Nav, NavLink } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './layout.css';

export default function Layout() {
  return (
    <div className="layout-wrapper"> {/* Envolver todo el layout en un div */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="ml-auto">
            <NavLink href="/login">Iniciar Sesión</NavLink>
            <NavLink href="/register">Registrarse</NavLink>
            <NavLink href="/profile">Perfil</NavLink>
          </Nav>
        </Container>
      </Navbar>
      
      <Container className="content">
        <Outlet />
      </Container>
      
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <Container>© 2024 Eventos. Todos los derechos reservados.</Container>
      </footer>
    </div>
  );
}