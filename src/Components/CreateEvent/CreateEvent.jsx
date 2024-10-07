import React, { useState, useEffect } from 'react';
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
    <div className="container mt-5">
      <h2>Crear un nuevo evento</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del evento</label>
          <input
            type="text"
            placeholder="Nombre del evento"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Edad mínima</label>
          <input
            type="number"
            placeholder="Edad mínima"
            value={minimumAge}
            onChange={(e) => setMinimumAge(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Lugar</label>
          <select
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            required
            className="form-select"
          >
            <option value="">Selecciona un lugar</option>
            {places.length > 0 && places.map((place) => (
              <option key={place._id} value={place._id}>
                {place.name} - {place.address}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">URL de la foto</label>
          <input
            type="text"
            placeholder="URL de la foto"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;
