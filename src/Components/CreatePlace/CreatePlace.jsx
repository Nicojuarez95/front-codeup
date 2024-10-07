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
    <div className="container mt-5">
      <h2>Crear un nuevo lugar</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del lugar</label>
          <input 
            type="text" 
            placeholder="Nombre del lugar" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input 
            type="text" 
            placeholder="Dirección" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Capacidad</label>
          <input 
            type="number" 
            placeholder="Capacidad" 
            value={occupancy} 
            onChange={(e) => setOccupancy(e.target.value)} 
            required 
            className="form-control"
          />
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

        <button type="submit" className="btn btn-primary">Crear lugar</button>
      </form>
    </div>
  );
};

export default CreatePlace;

