import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreatePlace = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [occupancy, setOccupancy] = useState(0);
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/places/create', 
        { name, address, occupancy, photo }, 
        { headers: { Authorization: `Bearer ${token}` } });

      setSuccess('Lugar creado exitosamente');
      setError(null);
      setName('');
      setAddress('');
      setOccupancy(0);
      setPhoto('');
    } catch (error) {
      setError('Error al crear el lugar');
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Crear un Nuevo Lugar</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="p-4 shadow">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPlaceName">
            <Form.Label>Nombre del lugar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del lugar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaceAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaceOccupancy">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Capacidad"
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlacePhoto">
            <Form.Label>URL de la foto</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la foto"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Crear lugar
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreatePlace;

