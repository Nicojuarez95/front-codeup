import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredEvents, setFilteredEvents] = useState([]); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/events/getevent');

        if (response.data && Array.isArray(response.data.events)) {
          setEvents(response.data.events); // Almacena los eventos
          setFilteredEvents(response.data.events); // Inicializa eventos filtrados
        } else {
          console.error("Expected array but got:", response.data.events);
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events');
      } finally {
        setLoading(false); // Detiene la carga después de intentar obtener los datos
      }
    };

    fetchEvents();
  }, []);

  // Maneja el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    // Filtra los eventos basados en el término de búsqueda
    const filtered = events.filter(event => 
      event.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  // Función para restablecer el campo de búsqueda
  const handleResetSearch = () => {
    setSearchTerm(''); // Limpia el campo de búsqueda
    setFilteredEvents(events); // Muestra todos los eventos
  };

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Loading events...</p>;
  }

  // Muestra un mensaje de error si hay algún problema al obtener los datos
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Renderiza los eventos
  return (
    <div className="container my-5">
      {/* Campo de búsqueda */}
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Label>Buscar por nombre de evento</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingrese el nombre del evento" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        
      </Form>

      <div className="row">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="col-md-4" key={event._id}>
              <Card className="mb-4">
                <Card.Img variant="top" src={event.photo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeR7-eAb0dJhP7YebNJLpuoZMGsEeu73zOcw&s'} />
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
          ))
        ) : (
          <p>No hay eventos disponibles</p> 
        )}
      </div>
    </div>
  );
}
