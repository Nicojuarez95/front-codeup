import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

export default function EventDetails() {
  const { id } = useParams(); // Obtiene el ID del evento de la URL
  const [event, setEventDetails] = useState(null); // Estado para almacenar el evento
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Obtener el token desde el localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found, please log in');
        }

        // Hacer la solicitud GET al backend incluyendo el token en las cabeceras
        const response = await axios.get(`http://localhost:8000/events/event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Enviar el token en el encabezado de autorización
          }
        });

        // Guardar los detalles del evento en el estado y actualizar loading
        setEventDetails(response.data.event);
        setLoading(false); // Detener el estado de carga
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Error fetching event details');
        setLoading(false); // Detener el estado de carga incluso si hay error
      }
    };

    fetchEventDetails();
  }, [id]);  // Dependencia del ID del evento

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>No details available for this event</p>;
  }

  // Renderizar los detalles del evento
  return (
    <div className="container my-5">
      <Card>
        <Card.Img variant="top" src={event.photo || 'https://via.placeholder.com/150'} />
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text><strong>Descripción:</strong> {event.description}</Card.Text>
          <Card.Text><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Organizador:</strong> {event.organizer?.name || 'Desconocido'}</Card.Text>
          <Card.Text><strong>Edad mínima:</strong> {event.minimumAge} años</Card.Text>
          {/* Otras propiedades del evento si es necesario */}
          <Button variant="primary" href="/events">Volver a la lista</Button>
        </Card.Body>
      </Card>
    </div>
  );
}