import Login from "../../src/Pages/Login/Login.jsx"
import Register from "../../src/Pages/Register/Register.jsx"
import Index from "./Index/Index";
import IndexLayout from "../Layouts/IndexLayout";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Orders from './Orders/Orders.jsx';           // Vista para cocineros


export const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexLayout />,
        children: [
            { path: '/', element: <Index />},
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/orders', element: <Orders /> },  
        ]
    },
])