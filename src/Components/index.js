import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import Index from "./Index/Index.jsx";
import IndexLayout from "../Layouts/IndexLayout.jsx";
import { createBrowserRouter } from "react-router-dom";
import Events from "./Events/Events.jsx";
import EventsDetails from './EventsDetails/EventsDetails.jsx';           // Vista para cocineros
import 'bootstrap/dist/css/bootstrap.min.css';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexLayout />,
        children: [
            { path: '/', element: <Index />},
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/events', element: <Events /> },
            { path: '/events/:id', element: <EventsDetails/> },  
        ]
    },
])