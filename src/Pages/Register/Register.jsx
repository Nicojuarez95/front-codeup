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
        alert('Usuario creado con éxito'); // Mostrar mensaje de éxito (opcional)
        navigate('/login'); // Redirigir a la página de login
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMessage(error.response.data.message); // Mostrar mensaje de error
    }
  };

  return (
    <Container>
      <h1>Regístrate</h1>
      {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Muestra mensaje de error si existe */}
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
          <div>
            <Form.Check 
              type="radio" 
              label="Masculino" 
              name="genre" 
              value="masculino" 
              onChange={handleChange} 
            />
            <Form.Check 
              type="radio" 
              label="Femenino" 
              name="genre" 
              value="femenino" 
              onChange={handleChange} 
            />
            <Form.Check 
              type="radio" 
              label="Prefiero no especificar" 
              name="genre" 
              value="no_especificar" 
              onChange={handleChange} 
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">Registrarse</Button>
      </Form>
    </Container>
  );
}
