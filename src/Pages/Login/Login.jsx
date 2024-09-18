import React, { useState } from 'react';
import axios from 'axios';
import { Link as Anchor } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice.js'; // Ajusta la ruta según tu estructura
import "./login.css";
import 'tailwindcss/tailwind.css';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/users/sign-in', {
        name,
        password
      });
  
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Guarda el token en localStorage
        localStorage.setItem('token', token);
  
        // Guarda el usuario en Redux
        dispatch(setUser({user, token }));
  
        navigate('/dashboard');
      } else {
        setError('Nombre de usuario o contraseña incorrectos.');
      }
    } catch (err) {
      setError('Error durante el inicio de sesión.');
      console.error('Error during login:', err);
    }
  };
  return (
    <section className="flex justify-center items-center" id='body'>  
      <main className="w-11/12 md:max-w-5xl mx-auto grid md:grid-cols-2 rounded">
        <div className="bg-pizza w-full h-72 md:h-auto">
        </div>
        
        <div className="p-8 bg-white">
          {/* Botón de navegación con flecha */}
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-orange-500 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="ml-2">Volver a Home</span>
          </button>

          <div className="flex gap-1 items-center justify-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f87171" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </span>
            <h1 className="text-center text-slate-900 font-bold text-2xl">Ingresar</h1>
          </div>
          <p className="text-slate-500 text-center text-sm mt-2">Creá tus pedidos</p>

          <form className="mt-8" onSubmit={handleLogin}>
            <div className="py-2">
              <label htmlFor="name" className="block font-bold text-slate-900">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full bg-gray-100 p-2 mt-1 border-l-4 border-red-400 focus:outline-none"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />
            </div>
            <input
              type="submit"
              className="w-full bg-red-400 rounded text-white py-2 mt-2"
              value="Iniciar sesión"
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>

          <p className="text-slate-500 mt-5 flex gap-1">¿Todavía no tenés cuenta? 
            <span className="text-red-400 flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f87171" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <Anchor to={'/register'}>Registrarse</Anchor>
            </span>
          </p>
        </div>
      </main>  
    </section>
  );
}
