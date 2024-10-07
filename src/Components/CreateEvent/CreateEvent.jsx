import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [minimumAge, setMinimumAge] = useState(18);
  const [placeId, setPlaceId] = useState('');
  const [photo, setPhoto] = useState('');
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:8000/places/getplaces');
        setPlaces(response.data.places || []);
      } catch (err) {
        setError('Error al obtener los lugares');
        setPlaces([]);
      }
    };
    fetchPlaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/events/createevent', 
        { name, description, date, minimumAge, place: placeId, photo },  
        { headers: { Authorization: `Bearer ${token}` } });

      setSuccess('Evento creado exitosamente');
      setError(null);
    } catch (error) {
      setError('Error al crear el evento');
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Crear un Nuevo Evento</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="p-4 shadow">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEventName">
            <Form.Label>Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del evento"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEventDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEventDate">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEventMinimumAge">
            <Form.Label>Edad mínima</Form.Label>
            <Form.Control
              type="number"
              placeholder="Edad mínima"
              value={minimumAge}
              onChange={(e) => setMinimumAge(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEventPlace">
            <Form.Label>Lugar</Form.Label>
            <Form.Select
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              required
            >
              <option value="">Selecciona un lugar</option>
              {places.length > 0 && places.map((place) => (
                <option key={place._id} value={place._id}>
                  {place.name} - {place.address}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEventPhoto">
            <Form.Label>URL de la foto</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la foto"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Crear evento
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateEvent;
