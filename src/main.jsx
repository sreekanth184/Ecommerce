import { BrowserRouter, Link } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Globalconetx_provider from './Context/Globalconetx_provider.jsx'

createRoot(document.getElementById('root')).render(
  <Globalconetx_provider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </Globalconetx_provider>
)
