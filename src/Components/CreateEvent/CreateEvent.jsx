import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [minimumAge, setMinimumAge] = useState(18);
  const [placeId, setPlaceId] = useState('');  // El organizador elige el lugar
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/events/createevent', 
        { name, description, date, minimumAge, placeId, photo }, 
        { headers: { Authorization: `Bearer ${token}` } });

      setSuccess('Evento creado exitosamente');
      setError(null);
    } catch (error) {
      setError('Error al crear el evento');
      setSuccess(null);
    }
  };

  return (
    <div className="container">
      <h2>Crear un nuevo evento</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre del evento" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="number" placeholder="Edad mínima" value={minimumAge} onChange={(e) => setMinimumAge(e.target.value)} required />
        <input type="text" placeholder="ID del lugar" value={placeId} onChange={(e) => setPlaceId(e.target.value)} required />
        <input type="text" placeholder="URL de la foto" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        <button type="submit">Crear evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;
