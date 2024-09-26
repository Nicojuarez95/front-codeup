import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
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
      await axios.post('http://localhost:8000/users/signup', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <Container>
      <h1>Regístrate</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formLastname">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" name="lastname" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Label>Edad</Form.Label>
          <Form.Control type="number" name="age" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formGenre">
          <Form.Label>Género</Form.Label>
          <Form.Control type="text" name="genre" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Registrarse</Button>
      </Form>
    </Container>
  );
}
