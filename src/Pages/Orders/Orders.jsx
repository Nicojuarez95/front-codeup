import React, { useState, useEffect } from 'react';
import './orders.css';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Obtener todos los pedidos al cargar el componente
    axios.get('/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <section className="flex justify-center items-center" id='body'>
      <main className="w-11/12 md:max-w-5xl mx-auto">
        <h1 className="text-center text-slate-900 font-bold text-2xl">Pedidos Detallados</h1>
        <div className="p-8 bg-white mt-4">
          {orders.map(order => (
            <div key={order._id} className="mb-4 p-4 border border-gray-300 rounded">
              <h2 className="text-lg font-semibold">Mesa {order.table}</h2>
              <p><strong>Productos:</strong> {order.products.join(', ')}</p>
              <p><strong>Estado:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
