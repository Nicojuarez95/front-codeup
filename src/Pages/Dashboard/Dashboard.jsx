import React, { useState, useEffect } from 'react';
import './dashboard.css';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import refresh from "../../Img/refresh-square-svgrepo-com.svg"

export default function Dashboard() {
  const [newOrder, setNewOrder] = useState({ table: '', products: [], description: '' });
  const [recentOrders, setRecentOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const user = useSelector((state) => state.user.user);
  const { token } = useSelector(state => state.user.token);

  const fetchTables = () => {
    axios.get('http://localhost:8000/tables/get')
      .then(response => {
        const data = response.data;
        if (data.success && Array.isArray(data.tables)) {
          // Filtra mesas con status diferente de 'occupied'
          const availableTables = data.tables.filter(table => table.status !== 'occupied');
          setTables(availableTables);
        } else {
          console.error('Unexpected format for tables:', data);
        }
      })
      .catch(error => console.error('Error fetching tables:', error));
  };

  useEffect(() => {
    fetchTables();
    fetchProducts();
    fetchRecentOrders();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8000/products/get')
      .then(response => {
        const data = response.data;
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          console.error('Unexpected format for products:', data);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchRecentOrders = () => {
    axios.get('http://localhost:8000/orders/get')
      .then(response => {
        const data = response.data;
        if (data.success && Array.isArray(data.orders)) {
          setRecentOrders(data.orders);
        } else {
          console.error('Unexpected format for recent orders:', data);
        }
      })
      .catch(error => console.error('Error fetching recent orders:', error));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(query)));
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const isChecked = e.target.checked;
    setNewOrder(prevOrder => {
      const updatedProducts = isChecked
        ? [...prevOrder.products, { product: productId, quantity: 1 }]
        : prevOrder.products.filter(product => product.product !== productId);
      return { ...prevOrder, products: updatedProducts };
    });
  };

  const handleQuantityChange = (e, productId) => {
    const quantity = parseInt(e.target.value, 10) || 1;
    setNewOrder(prevOrder => {
      const updatedProducts = prevOrder.products.map(product =>
        product.product === productId ? { ...product, quantity } : product
      );
      return { ...prevOrder, products: updatedProducts };
    });
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.error('User is not authenticated or has no ID');
      return;
    }

    if (!newOrder.table) {
      console.error('Table is required');
      return;
    }

    if (newOrder.products.length === 0) {
        console.error('At least one product is required');
        return;
    }

    console.log('Creating order with data:', {
        table: newOrder.table,
        products: newOrder.products,
        description: newOrder.description,
        waiter: user._id
    });

    axios.post('http://localhost:8000/orders/create', {
        table: newOrder.table,
        products: newOrder.products,
        description: newOrder.description,
        waiter: user._id
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        const data = response.data;

        if (data.success && data.order) {
          console.log('Order created successfully:', data.order);
          setRecentOrders([data.order, ...recentOrders]);
          setNewOrder({ table: '', products: [], description: '' });
        } else {
          console.error('Unexpected response format for created order:', data);
        }
      })
      .catch(error => {
        console.error('Error creating order:', error);
        if (error.response && error.response.data) {
          console.error('Server error message:', error.response.data.message);
        }
      });
  };

  return (
    <section className="flex justify-center items-center" id="body">
      <main className="w-11/12 md:max-w-5xl mx-auto grid md:grid-cols-2 rounded overflow-hidden">
        <div className="bg-pizza w-full h-72 md:h-auto"></div>
        <div className="p-8 bg-white flex flex-col h-full">
          <div className="flex items-center justify-between">
            <div className="flex justify-between gap-1">
              <h1 className="text-slate-900 font-bold text-2xl">Crear Pedido</h1>
              <button
                onClick={() => {
                  fetchTables();
                  fetchProducts();
                }}
                className="scale-125 ml-3 hover:scale-150"
              >
                <img 
                src={refresh} 
                alt="Icon" 
                className="w-6 h-6" 
                />
              </button>
            </div>
          </div>
          <form className="mt-8 flex flex-col flex-grow" onSubmit={handleCreateOrder}>
            <div className="py-2">
              <label htmlFor="table" className="block font-bold text-slate-900">Mesa</label>
              <select id="table" name="table" value={newOrder.table} onChange={(e) => setNewOrder({ ...newOrder, table: e.target.value })} className="w-full bg-gray-100 p-2 mt-1 border-l-4 border-red-400 focus:outline-none">
                <option value="">Selecciona una mesa</option>
                {tables.map(table => (
                  <option key={table._id} value={table._id}>{table.number}</option>
                ))}
              </select>
            </div>
            <div className="py-2">
              <label htmlFor="search" className="block font-bold text-slate-900">Buscar Productos</label>
              <input 
                type="text" 
                id="search" 
                value={search} 
                onChange={handleSearchChange} 
                placeholder="Buscar productos..." 
                className="w-full bg-gray-100 p-2 mt-1 border-l-4 border-red-400 focus:outline-none"
              />
            </div>
            <div className="py-2 flex-grow overflow-y-auto h-40">
              <label htmlFor="products" className="block font-bold text-slate-900">Productos</label>
              {filteredProducts.map(product => (
                <div key={product._id} className="flex items-center mb-2">
                  <input 
                    type="checkbox" 
                    id={`product-${product._id}`} 
                    value={product._id} 
                    checked={newOrder.products.some(p => p.product === product._id)} 
                    onChange={handleProductChange} 
                    className="mr-2"
                  />
                  <label htmlFor={`product-${product._id}`} className="flex-grow">{product.name}</label>
                  {newOrder.products.some(p => p.product === product._id) && (
                    <input 
                      type="number" 
                      value={newOrder.products.find(p => p.product === product._id)?.quantity || 1} 
                      onChange={(e) => handleQuantityChange(e, product._id)} 
                  min="1" 
                  className="w-16 text-center"
                />
              )}
            </div>
          ))}
        </div>
        <div className="py-2">
          <label htmlFor="description" className="block font-bold text-slate-900">Comentario</label>
          <textarea 
            id="description" 
            name="description" 
            value={newOrder.description} 
            onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })} 
            rows="4" 
            className="w-full bg-gray-100 p-2 mt-1 border-l-4 border-red-400 focus:outline-none h-10"
            placeholder="Agrega comentarios o peticiones especiales..."
          />
        </div>
        <input type="submit" className="w-full bg-red-400 rounded text-white py-2 mt-2 hover:scale-105 cursor-pointer" value="Crear Pedido"/>
      </form>
      <div className="mt-3 flex flex-col flex-grow overflow-y-auto " >
        <h2 className="text-center text-slate-900 font-bold text-xl mb-2">Pedidos Recientes</h2>
        <div className="overflow-y max-h-20 border-t border-gray-300">
        <ul className="p-2 max-h-30">
            {recentOrders.map(order => (
                <li key={order._id} className="py-2 border-b">
                Mesa {order.table.number} - Productos: {order.products.map(p => `x${p.quantity} ${p.product.name} `).join(', ')}- Estado: {order.status} - Empleado: {user.name}
                </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  </main>
</section>

  );
}