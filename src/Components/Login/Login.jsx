import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hacer la solicitud de login al backend
      const response = await axios.post('http://localhost:8000/users/signin', formData);
      
      // Obtener el token y el userId de la respuesta
      const { token, user } = response.data;
  
      // Guardar el token y el userId en el localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);  // Aquí guardamos el userId
  
      // Redirigir a la página de eventos
      navigate('/events');
    } catch (error) {
      alert(error.response.data.message);
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Container>
      <h1>Iniciar Sesión</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Iniciar Sesión</Button>
      </Form>
    </Container>
  );
}
