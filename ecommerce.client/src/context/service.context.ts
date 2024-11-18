import React, { createContext, useContext } from 'react';
import { HomeServiceFirebaseImpl } from '../service/firebase/home.firebase.service';
import { HomeServiceFakeImpl } from '../service/fake/home.fake.service';
import { IHomeService } from '@/service/home.service';

export interface ServicesContext {
  homeService: IHomeService;
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
