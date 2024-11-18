// index.tsx
import { createRoot } from 'react-dom/client';
import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { HomeServiceFirebaseImpl } from './service/firebase/home.firebase.service.ts';
import { ServiceContext } from './context/service.context.ts';
import { HomeServiceFakeImpl } from './service/fake/home.fake.service.ts';

const services = {
  homeService : new HomeServiceFakeImpl()
  // Add other services here as needed
};


createRoot(document.getElementById('root')!).render(
  <ServiceContext.Provider value={services}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServiceContext.Provider>
);

