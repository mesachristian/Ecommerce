import { createRoot } from 'react-dom/client'
import './index.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
