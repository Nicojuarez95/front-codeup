import React from 'react';
import { Container, Navbar, Nav, NavLink } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Importar hooks de redux
import { clearUser } from '../store/userSlice'; // Importar la acción para limpiar el usuario
import './layout.css';

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Acceder al estado del usuario en redux
  const { user, token } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(clearUser()); // Limpiar el usuario desde el estado de Redux
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <div className="layout-wrapper">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Inicio</Navbar.Brand>
          <Nav className="ml-auto">
            {!token ? ( // Si no hay token, mostrar los enlaces de iniciar sesión y registro
              <>
                <NavLink href="/login">Iniciar Sesión</NavLink>
                <NavLink href="/register">Registrarse</NavLink>
              </>
            ) : ( // Si hay un token, mostrar el perfil y la opción de cerrar sesión
              <>
                <NavLink href="/profile">Perfil</NavLink>
                <NavLink onClick={handleLogout}>Cerrar Sesión</NavLink>
              </>
            )}
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
