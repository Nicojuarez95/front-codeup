import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './Components/index.js'
import { store } from './store/store.js'
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = baseUrl;

function App() {
    return (
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
    );
}

export default App;
