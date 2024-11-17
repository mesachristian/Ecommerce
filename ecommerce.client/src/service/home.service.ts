// IDataService.ts
export interface HomeService {
    getAllProducts(productId: string | undefined): Promise<[]>;
    getProductInfo(): Promise<[]>;
  }
