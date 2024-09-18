import React from 'react';
import { Link as Anchor } from 'react-router-dom';

export default function Home() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/featured/?restaurant')" }}>
      <div className="w-11/12 md:max-w-md mx-auto bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Bienvenido</h1>
        <p className="text-slate-700 mb-8">Elige una opción para continuar</p>
        <div className="flex flex-col gap-4">
          <Anchor to={'/login'} className="w-full bg-red-400 text-white py-2 rounded hover:scale-105 transition-transform">
            Iniciar sesión
          </Anchor>
          <Anchor to={'/register'} className="w-full bg-red-400 text-white py-2 rounded hover:scale-105 transition-transform">
            Registro
          </Anchor>
        </div>
      </div>
    </section>
  );
}
