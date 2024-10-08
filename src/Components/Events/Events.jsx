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
  const [showRegistered, setShowRegistered] = useState(false); // Estado para controlar el checkbox

  // Función que obtiene los eventos desde el servidor
  const fetchEvents = async (showOnlyRegistered) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Obtén el token JWT almacenado en localStorage

      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      // Configuración de los headers con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Enviamos el token en la cabecera
        },
      };

      // Cambiamos el endpoint en base a si se quieren ver solo eventos registrados o todos los eventos
      const endpoint = showOnlyRegistered
        ? 'http://localhost:8000/users/events' // Ruta para eventos registrados
        : 'http://localhost:8000/events/getevent'; // Ruta para todos los eventos

      const response = await axios.get(endpoint, config); // Hacemos la petición con el token

      if (response.data && Array.isArray(response.data.events)) {
        setEvents(response.data.events); // Guardamos los eventos en el estado
        setFilteredEvents(response.data.events); // Inicializamos los eventos filtrados
      } else {
        console.error("Expected array but got:", response.data.events);
        setError("Unexpected data format");
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false); // Terminamos la carga después de intentar obtener los datos
    }
  };

  // Se ejecuta cada vez que se monta el componente o cambia el estado de showRegistered
  useEffect(() => {
    fetchEvents(showRegistered); // Hacemos la petición basada en el estado del checkbox
  }, [showRegistered]); // Cada vez que showRegistered cambia, se actualizan los eventos

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

  // Maneja el cambio del checkbox
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setShowRegistered(isChecked); // Actualizamos el estado de showRegistered, lo que activará useEffect
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
      {/* Campo de búsqueda y checkbox */}
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
        <Form.Group controlId="registeredCheckbox">
          <Form.Check
            type="checkbox"
            label="Mostrar solo eventos registrados"
            checked={showRegistered} // Aseguramos que el estado coincida con el checkbox
            onChange={handleCheckboxChange}
          />
        </Form.Group>
      </Form>

      <div className="row">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
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
          ))
        ) : (
          <p>No hay eventos disponibles</p> 
        )}
      </div>
    </div>
  );
}
