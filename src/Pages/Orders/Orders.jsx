import React, { useState, useEffect } from 'react';
import './orders.css';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener todos los pedidos al cargar el componente
    axios.get('http://localhost:8000/orders/get')
      .then(response => {
        console.log('Pedidos recibidos:', response.data.orders);
        setOrders(response.data.orders);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100" id='body'>
      <main className="w-11/12 md:max-w-5xl mx-auto p-6 bg-white rounded shadow">
        {/* Título y botón */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-slate-900 font-bold text-2xl">Pedidos Detallados</h1>
          
          {/* Botón para volver a "Crear Pedido" */}
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-orange-400 text-white py-2 px-4 hover:bg-orange-500 cursor-pointer rounded-md"
          >
            Crear Pedido
          </button>
        </div>
        
        {/* Contenedor para las órdenes, con scroll si hay muchas */}
        <div className="p-8 bg-gray-50 rounded-md shadow-inner max-h-96 overflow-y-auto">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order._id} className="mb-4 p-4 bg-white border border-gray-300 rounded shadow-sm">
                {/* Accediendo a la propiedad 'number' del objeto 'table' */}
                <h2 className="text-lg font-semibold">Mesa {order.table?.number || 'Desconocida'}</h2>
                
                {/* Productos */}
                <p>
                  <strong>Productos:</strong> 
                  {order.products.map(p => (
                    <span key={p._id} className="block">
                      {p.quantity} x {p.product?.name || 'Producto Desconocido'}
                    </span>
                  ))}
                </p>
                
                {/* Estado del pedido */}
                <p><strong>Estado:</strong> {order.status}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-600">No hay pedidos disponibles.</p>
          )}
        </div>
      </main>
    </section>
  );
}
