import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Include mock API.
import './mock';
import { BrowserRouter as BR } from 'react-router-dom';
import { ContextProvider } from './context/dataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BR>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BR>
  </React.StrictMode>,
)

