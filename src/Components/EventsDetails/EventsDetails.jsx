import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

export default function EventDetails() {
  const { id } = useParams(); // Obtener el ID del evento de la URL
  const [event, setEventDetails] = useState(null); // Estado para almacenar el evento
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // Estado para verificar si el usuario está registrado
  const [rating, setRating] = useState(''); // Estado para el valor de la puntuación
  const [comment, setComment] = useState(''); // Estado para el valor del comentario
  const [comments, setComments] = useState([]); // Estado para almacenar comentarios
  const [averageRating, setAverageRating] = useState(0); // Estado para almacenar la puntuación promedio

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in');
        }

        // Obtener detalles del evento
        const response = await axios.get(`http://localhost:8000/events/event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const eventData = response.data.event;
        const userId = response.data.userId; // Asumimos que el backend también devuelve el ID del usuario autenticado

        // Verificar si el usuario está registrado en el evento
        const registered = eventData.attendees.some(attendee => attendee._id === userId);
        setIsRegistered(registered);
        setEventDetails(eventData);
        setComments(eventData.comments || []); // Asumimos que el evento incluye comentarios
        setLoading(false);
        
        // Calcular la puntuación promedio solo si hay puntuaciones
        if (eventData.ratings && eventData.ratings.length > 0) {
          const total = eventData.ratings.reduce((sum, rating) => sum + rating, 0);
          setAverageRating(total / eventData.ratings.length);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Error fetching event details');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in');
      }

      await axios.post('http://localhost:8000/events/register', { eventId: id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Actualizar el estado de registrado
      setIsRegistered(true);
    } catch (error) {
      console.error('Error registering for event:', error);
      setError('Error registering for event');
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in');
      }
  
      await axios.post(`http://localhost:8000/users/event/${id}/rate`, { rating }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      alert('Rating submitted successfully');
      setRating(''); // Limpiar el campo de rating
  
      // Asegúrate de que comments.length no es 0 antes de calcular el nuevo promedio
      const newCommentsLength = comments.length + 1; // Incluyendo el nuevo comentario
      const newAverage = (averageRating * comments.length + parseInt(rating)) / newCommentsLength;
      setAverageRating(newAverage);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error submitting rating';
      alert(errorMessage); 
      console.error('Error submitting rating:', errorMessage);
    }
  };
  
  const handleCommentSubmit = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found, please log in');
        }

        const response = await axios.post(`http://localhost:8000/users/event/${id}/comment`, { comment }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        alert('Comment submitted successfully');
        setComment(''); // Limpiar el campo de comentario

        // Asegúrate de que el comentario devuelto tiene la estructura correcta
        if (response.data.comment) {
            // Agregar el nuevo comentario a la lista
            setComments((prevComments) => [...prevComments, response.data.comment]); 
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error submitting comment';
        alert(errorMessage); // Mostrar el mensaje de error en alerta
        console.error('Error submitting comment:', errorMessage);
    }
};

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>No details available for this event</p>;
  }

  return (
    <div className="container my-3">
      <Card>
        <Card.Img 
          variant="top" 
          src={event.photo || 'https://via.placeholder.com/150'} 
          alt={`Imagen del evento ${event.name}`}
          style={{ width: '100%', height: '400px', margin: '0 auto', display: 'block', objectFit: 'contain' }}
        />
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text><strong>Descripción:</strong> {event.description}</Card.Text>
          <Card.Text><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Organizador:</strong> {event.organizer?.name || 'Desconocido'}</Card.Text>
          <Card.Text><strong>Edad mínima:</strong> {event.minimumAge} años</Card.Text>

          {/* Botón de registro si el usuario no está registrado */}
          {!isRegistered ? (
            <Button variant="primary" onClick={handleRegister}>
              Registrarse en el evento
            </Button>
          ) : (
            <>
              {/* Formulario para calificar y comentar si el usuario está registrado */}
              <Form className="mt-3">
                <Form.Group controlId="formRating">
                  <Form.Label>Calificar el evento</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Ingresa una puntuación (1-5)"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleRatingSubmit} className="mt-2">
                    Enviar puntuación
                  </Button>
                </Form.Group>

                <Form.Group controlId="formComment" className="mt-3">
                  <Form.Label>Dejar un comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Escribe un comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleCommentSubmit} className="mt-2">
                    Enviar comentario
                  </Button>
                </Form.Group>
              </Form>
            </>
          )}

          <Card.Text className="mt-3"><strong>Puntuación promedio:</strong> {averageRating.toFixed(1)} / 5</Card.Text>

          <Card.Title>Comentarios:</Card.Title>
          {comments.length > 0 ? (
            <ul>
              {comments.map((c) => (
                <li key={c._id}>
                  <strong>ANÓNIMO:</strong> {c.comment || 'Sin comentario'} <em>{new Date(c.timestamp).toLocaleString()}</em>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay comentarios para este evento.</p>
          )}

          <Button variant="secondary" href="/events" className="mt-3">Volver a la lista</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
