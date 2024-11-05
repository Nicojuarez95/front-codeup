import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    age: '',
    genre: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar mensajes de error
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/signup', formData);
      if (response.status === 201) { // Cambié a 201, que es el código de creado
        alert('Usuario creado con éxito');
        navigate('/login'); // Redirigir a la página de login
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMessage(error.response.data.message); // Mostrar mensaje de error
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow p-4" style={{ width: '400px', borderRadius: '10px' }}>
        <Card.Title className="text-center mb-4">Regístrate</Card.Title>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>} {/* Muestra mensaje de error si existe */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              onChange={handleChange} 
              placeholder="Introduce tu nombre" 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formLastname" className="mt-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control 
              type="text" 
              name="lastname" 
              onChange={handleChange} 
              placeholder="Introduce tu apellido" 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
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
          <Form.Group controlId="formAge" className="mt-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control 
              type="number" 
              name="age" 
              onChange={handleChange} 
              placeholder="Introduce tu edad" 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formGenre" className="mt-3">
            <Form.Label>Género</Form.Label>
            <div>
              <Form.Check 
                type="radio" 
                label="Masculino" 
                name="genre" 
                value="masculino" 
                onChange={handleChange} 
                inline 
              />
              <Form.Check 
                type="radio" 
                label="Femenino" 
                name="genre" 
                value="femenino" 
                onChange={handleChange} 
                inline 
              />
              <Form.Check 
                type="radio" 
                label="Prefiero no especificar" 
                name="genre" 
                value="no_especificar" 
                onChange={handleChange} 
                inline 
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4 w-100">Registrarse</Button>
        </Form>
      </Card>
    </Container>
  );
}
