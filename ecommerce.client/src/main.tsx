// index.tsx
import { createRoot } from 'react-dom/client';
import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
//import { HomeServiceFirebaseImpl } from './service/firebase/home.firebase.service.ts';
import { ServiceContext, ServicesContext } from './context/service.context.ts';
import { HomeServiceFakeImpl } from './service/fake/home.fake.service.ts';
import { HomeServiceFirebaseImpl } from './service/firebase/home.firebase.service.ts';
import { FavoritesServiceFakeImpl } from './service/fake/favorites.fake.service.ts';
import { ShoppingCartFakeImpl } from './service/fake/shopping-cart.fake.service.ts';
import { ShoppingCartFirebaseImpl } from './service/firebase/shopping-cart.firebase.service.ts';

const services: ServicesContext = {
  homeService : new HomeServiceFirebaseImpl(),
  //homeService : new HomeServiceFakeImpl(),
  favoritesService: new FavoritesServiceFakeImpl(),
  shoppingCartService : new ShoppingCartFirebaseImpl()
  
  // Add other services here as needed
};


createRoot(document.getElementById('root')!).render(
  <ServiceContext.Provider value={services}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServiceContext.Provider>
);

