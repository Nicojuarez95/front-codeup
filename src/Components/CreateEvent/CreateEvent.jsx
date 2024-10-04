import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    place: '',
    photo: '',
    description: '',
    minimumAge: 18,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/events/createevent', formData, {
        headers: {
          Authorization: `Bearer ${token}` // Enviar el token en la solicitud
        }
      });
      
      alert('Evento creado exitosamente');
    } catch (error) {
      console.error('Error creando evento:', error);
    }
  };

  return (
    <div className="container">
      <h2>Crear Evento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre del Evento</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Fecha</Form.Label>
          <Form.Control 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        {/* Otros campos del formulario */}

        <Button type="submit">Crear Evento</Button>
      </Form>
    </div>
  );
}
