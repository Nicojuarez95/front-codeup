import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Importar useDispatch para disparar acciones
import axios from 'axios';
import { setUser } from '../../store/userSlice.js'; // Importar la acción setUser desde el slice

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Crear el dispatcher para ejecutar acciones

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
      
      // Obtener el token y el user de la respuesta
      const { token, user } = response.data;
  
      // Guardar el token y el user en Redux
      dispatch(setUser({ user, token }));

      // Redirigir a la página de eventos
      navigate('/events');
    } catch (error) {
      alert(error.response.data.message);
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-10">
    <Card className="shadow p-4" style={{ width: '400px', borderRadius: '10px' }}>
      <Card.Title className="text-center mb-4">Iniciar Sesión</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            onChange={handleChange} 
            placeholder="Introduce tu email" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            onChange={handleChange} 
            placeholder="Introduce tu contraseña" 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4 w-100">Iniciar Sesión</Button>
      </Form>
      <div className="text-center mt-3">
        <a href="/register">¿No tienes una cuenta? Regístrate aquí</a>
      </div>
    </Card>
  </Container>
  );
}
