import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdminContextProvider from '../context/AdminContext.jsx'
import UserContextProvider from '../context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <UserContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
