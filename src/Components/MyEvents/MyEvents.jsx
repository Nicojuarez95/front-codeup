import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function OrganizerEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizerEvents = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token

        // Verificamos si hay un token disponible
        if (!token) {
          throw new Error('No token found');
        }

        // Hacemos la solicitud para obtener los eventos del organizador autenticado
        const response = await axios.get('http://localhost:8000/events/organizer', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Actualizamos el estado con los eventos obtenidos
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching organizer events:', error);
        // Si hay un error en la respuesta, mostramos el mensaje de error del servidor
        if (error.response) {
          setError(error.response.data.message || 'Error al obtener eventos del organizador.');
        } else {
          setError('Error de red. Por favor, verifica tu conexión.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizerEvents();
  }, []);

  if (loading) {
    return <p>Cargando eventos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (events.length === 0) {
    return <p>No has creado ningún evento aún.</p>;
  }

  return (
    <div className="container my-5">
      <h2>Mis eventos</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4" key={event._id}>
            <Card className="mb-4">
              <Card.Img variant="top" src={event.photo || 'https://via.placeholder.com/150'} />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</Card.Text>
                <Link to={`/events/${event._id}`}>
                  <Button variant="primary">Ver detalles</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
