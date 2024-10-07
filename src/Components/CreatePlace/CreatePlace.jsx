import React, { useState } from 'react';
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
    } catch (error) {
      setError('Error al crear el lugar');
      setSuccess(null);
    }
  };

  return (
    <div className="container">
      <h2>Crear un nuevo lugar</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre del lugar" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="number" placeholder="Capacidad" value={occupancy} onChange={(e) => setOccupancy(e.target.value)} required />
        <input type="text" placeholder="URL de la foto" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        <button type="submit">Crear lugar</button>
      </form>
    </div>
  );
};

export default CreatePlace;
