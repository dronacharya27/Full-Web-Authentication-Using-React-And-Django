import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataContextProvider } from './Context/Context.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataContextProvider>
     
    <App />
    <ToastContainer theme='colored'/>
    </DataContextProvider>
  </React.StrictMode>,
)
