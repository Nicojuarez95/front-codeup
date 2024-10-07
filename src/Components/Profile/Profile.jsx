import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, NavLink } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../store/userSlice.js'; // Importar la acción para actualizar el usuario

export default function Profile() {
  const dispatch = useDispatch();

  // Obtener el usuario y el token del estado de Redux
  const { user, token } = useSelector((state) => state.user);

  // Estados locales para los campos editables del perfil
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || ''
  });

  // Estado para los campos de cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',  // Cambiado a oldPassword para que coincida con el controlador
    newPassword: ''
  });

  // Manejar los cambios en los inputs del perfil
  const handleProfileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manejar los cambios en los inputs de la contraseña
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  // Función para actualizar los datos del perfil
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en la cabecera
        }
      };

      // Enviar la solicitud para actualizar los datos del usuario al backend
      const response = await axios.put(`http://localhost:8000/users/update`, formData, config);
      
      const updatedUser = response.data;
      dispatch(setUser({ user: updatedUser, token }));
      alert('Información actualizada exitosamente');
    } catch (error) {
      alert('Error al actualizar la información');
      console.error('Error:', error.response ? error.response.data : error);
    }
  };

  // Función para cambiar la contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    // Validar que las contraseñas no estén vacías
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      console.error("Both passwords are required");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Usar el token almacenado en Redux
        },
      };

      const body = {
        oldPassword: passwordData.oldPassword,  // Usar el estado correcto
        newPassword: passwordData.newPassword,
      };

      console.log("Enviando datos de password:", body);

      const response = await axios.put('http://localhost:8000/users/update-password', body, config);
      console.log('Password actualizada:', response.data);
      alert('Contraseña actualizada con éxito'); // Notificación al usuario
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error.response ? error.response.data : error);
      alert('Error al actualizar la contraseña');
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Perfil de Usuario</h1>
      <Row>
        <Col md={8}>
          {/* Formulario para editar los datos del perfil */}
          <Form onSubmit={handleProfileSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
              />
            </Form.Group>

            <Form.Group controlId="formAge" className="mt-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleProfileChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Guardar cambios
            </Button>
          </Form>

          {/* Formulario para cambiar la contraseña */}
          <h2 className="mt-5">Cambiar Contraseña</h2>
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group controlId="formOldPassword" className="mt-3">
              <Form.Label>Contraseña Actual</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"  // Cambiado a oldPassword
                value={passwordData.oldPassword}  // Usar el estado correcto
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Form.Group controlId="formNewPassword" className="mt-3">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Button variant="secondary" type="submit" className="mt-4">
              Actualizar Contraseña
            </Button>
          </Form>
        </Col>

        <Col md={4} className="text-center">
          <NavLink href="/organizer/myevents" className="btn btn-secondary mt-4">
            Mis eventos
          </NavLink>
          <NavLink href="/organizer/create" className="btn btn-secondary mt-4">
            Crear evento
          </NavLink>

          {/* Mostrar el botón de "Crear Lugar" solo si el usuario es admin */}
          {user?.role === 'admin' && (
            <NavLink href="/organizer/createplace" className="btn btn-secondary mt-4">
              Crear Lugar
            </NavLink>
          )}
        </Col>
      </Row>
    </Container>
  );
}
