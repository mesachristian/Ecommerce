import { CategoryMiniature, HomeSection, Product } from "@/models";

// IDataService.ts
export interface IHomeService {
    getCategories(): Promise<CategoryMiniature[]>;
    getHomeSections(): Promise<HomeSection[]>;
  }
