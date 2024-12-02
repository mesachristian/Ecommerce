import { createRoot } from 'react-dom/client';
import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ServiceContext, ServicesContext } from './context/service.context.ts';
import { HomeServiceFirebaseImpl } from './service/firebase/home.firebase.service.ts';
import { FavoritesServiceFakeImpl } from './service/fake/favorites.fake.service.ts';
import { ShoppingCartFakeImpl } from './service/fake/shopping-cart.fake.service.ts';
import { AuthServiceFirebaseImpl } from './service/firebase/auth.firebase.service.ts';

const services: ServicesContext = {
  //homeService : new HomeServiceFakeImpl(),

  homeService: new HomeServiceFirebaseImpl(),
  favoritesService: new FavoritesServiceFakeImpl(),
  shoppingCartService: new ShoppingCartFakeImpl(),
  // Add other services here as needed
  authService: new AuthServiceFirebaseImpl()
};
createRoot(document.getElementById('root')!).render(
  <ServiceContext.Provider value={services}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServiceContext.Provider>
);

