import React, { useState } from 'react';
import axios from 'axios';
import "./register.css";
import 'tailwindcss/tailwind.css';
import { Link as Anchor } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      const response = await axios.post('http://localhost:8000/users/register', {
        name,
        password,
      });
      
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError('Error al registrar. Intenta nuevamente.');
      }
    } catch (error) {
      setError('Hubo un problema al registrar el usuario.');
    }
  };

  return (
    <section className="flex justify-center items-center" id="body">
      <main className="w-11/12 md:max-w-5xl mx-auto grid md:grid-cols-2 rounded">
        <div className="bg-pizza w-full h-72 md:h-auto"></div>
        <div className="p-8 bg-white">
          <div className="flex gap-1 items-center justify-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f87171" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </span>
            <h1 className="text-center text-slate-900 font-bold text-2xl">Registro</h1>
          </div>
          <p className="text-slate-500 text-center text-sm mt-2">Disfrutá de la mejor comida en la puerta de tu casa</p>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="py-2">
              <label htmlFor="name" className="block font-bold text-slate-900">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full bg-gray-100 p-2 mt-1 border-l-4 border-red-400 focus:outline-none"
                placeholder="José"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="py-2">
              <label htmlFor="password" className="block font-bold text-slate-900">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full bg-gray-100 p-2 mt-1 border-l-4 border-red-400 focus:outline-none"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">¡Registro exitoso!</p>}

            <input
              
              type="submit"
              className="w-full bg-red-400 rounded text-white py-2 mt-2"
              value="Registrarse"
            />
          </form>

          <p class="text-slate-500 mt-5 flex gap-1">¿Ya tenés cuenta? 
            <span class="text-red-400 flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f87171" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              <Anchor to={'/login'}>Iniciar sesion</Anchor>
            </span>
          </p>
        </div>
      </main>	
    </section>
  )
}
