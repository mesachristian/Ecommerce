import { createContext, useContext } from 'react';
import { IHomeService } from '@/service/home.service';
import { IFavoritesService } from '@/service/favorites.service';

export interface ServicesContext {
  homeService: IHomeService;
  favoritesService: IFavoritesService;
  // Add other services here as needed
}

export const ServiceContext = createContext<ServicesContext | null>(null);

export const useServices = (): ServicesContext => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};
