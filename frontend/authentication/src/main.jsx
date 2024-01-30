import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataContextProvider } from './Context/Context.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="641907459136-6c48hsqlr7p8656o7uerjr1s5iqglnf7.apps.googleusercontent.com">

    <DataContextProvider>
     
    <App />
    <ToastContainer theme='colored'/>
    </DataContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
