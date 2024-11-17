// DataServiceA.ts
import { HomeService } from '../home.service';

export class HomeServiceImpl implements HomeService {
    async getAllProducts(productId: string | undefined): Promise<[]> {
        return [];
      }
    async getProductInfo(): Promise<[]> {
        return [];
      }
}