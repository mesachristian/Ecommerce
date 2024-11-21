// HomeServiceFakeImpl.ts
import { IHomeService } from "../home.service";
import { CategoryMiniature, HomeSection, Product } from "@/models";

const CATEGORIES_LOCAL_STORAGE_KEY = "categories-key";
const PRODUCTS_LOCAL_STORAGE_KEY = "products-key";

export class HomeServiceFakeImpl implements IHomeService {
  constructor() {
    this.loadInitData();
  }

  async loadInitData(): Promise<void> {
    // Load Categories
    var categoriesJson = await import('@/assets/data/fake-categories.json');
    var categoriesObj = categoriesJson.default as CategoryMiniature[];
    localStorage.setItem(CATEGORIES_LOCAL_STORAGE_KEY, JSON.stringify(categoriesObj));

    // Load Products
    var productsJson = await import('@/assets/data/fake-products.json');
    var productsObj = productsJson.default as Product[];
    localStorage.setItem(PRODUCTS_LOCAL_STORAGE_KEY, JSON.stringify(productsObj));
  }

  /**
   * Fetches all categories (fake data with simulated delay).
   * @returns Promise resolving to an array of CategoryMiniature.
   */
  async getCategories(): Promise<CategoryMiniature[]> {
    var categoriesString = localStorage.getItem(CATEGORIES_LOCAL_STORAGE_KEY);
    // Simulate a delay of 2 seconds
    await new Promise(resolve => setTimeout(resolve, 500));
    return categoriesString ? JSON.parse(categoriesString) as CategoryMiniature[] : [];
  }

  /**
   * Fetches all home sections (fake data with simulated delay).
   * @returns Promise resolving to an array of HomeSection.
   */
  async getHomeSections(): Promise<HomeSection[]> {
    const sections: HomeSection[] = [
      {
        id: "s-1",
        sectionName: "Flashsale",
        products: [
          {
            id: "p-12",
            name: 'Sony 50" 4K',
            imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
            priceCOP: 1800000,
            notDiscountPriceCOP: 2200000,
            isLiked: true
          },
          {
            id: "p-2",
            name: "iPhone 14",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s",
            priceCOP: 4000000,
            notDiscountPriceCOP: 4500000,
            isLiked: false
          },
          {
            id: "p-9",
            name: "MacBook Air M2",
            imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
            priceCOP: 5000000,
            notDiscountPriceCOP: null,
            isLiked: true
          }
        ]
      },
      {
        id: "s-2",
        sectionName: "Celulares",
        products: [
          {
            id: "p-1",
            name: "Samsung Galaxy S23",
            imageUrl: "https://images.samsung.com/co/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-common-introduction-banner.jpg?imbypass=true",
            priceCOP: 3000000,
            notDiscountPriceCOP: null,
            isLiked: true
          },
          {
            id: "p-2",
            name: "iPhone 14",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s",
            priceCOP: 4000000,
            notDiscountPriceCOP: 4500000,
            isLiked: false
          },
          {
            id: "p-3",
            name: "Motorola Edge 40",
            imageUrl: "https://i.blogs.es/45176e/motorola-edge-40-1/650_1200.jpeg",
            priceCOP: 1500000,
            notDiscountPriceCOP: null,
            isLiked: true
          }
        ]
      },
      {
        id: "s-3",
        sectionName: "Computadores",
        products: [
          {
            id: "p-7",
            name: "Laptop Dell Inspiron",
            imageUrl: "https://m.media-amazon.com/images/I/71nP6lTogjL._AC_SL1500_.jpg",
            priceCOP: 2500000,
            notDiscountPriceCOP: null,
            isLiked: true
          },
          {
            id: "p-8",
            name: "HP Pavilion x360",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNLBUmz4x3MEA_E2ziHYOJatPwHBMrskZAnQ&s",
            priceCOP: 2200000,
            notDiscountPriceCOP: null,
            isLiked: false
          },
          {
            id: "p-9",
            name: "MacBook Air M2",
            imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
            priceCOP: 5000000,
            notDiscountPriceCOP: null,
            isLiked: true
          }
        ]
      },
      {
        id: "s-4",
        sectionName: "Televisores",
        products: [
          {
            id: "p-10",
            name: 'Samsung 55" 4K UHD',
            imageUrl: "https://team8.se/wp-content/uploads/2022/06/809dd429-c812-41db-a1b6-ef43b27a866d.jpg",
            priceCOP: 2000000,
            notDiscountPriceCOP: 2500000,
            isLiked: false
          },
          {
            id: "p-11",
            name: 'LG 65" OLED',
            imageUrl: "https://www.lg.com/content/dam/channel/wcms/co/images/televisores/oled65c3psa_awc_escb_co_c/gallery/DZ-9.jpg",
            priceCOP: 4500000,
            notDiscountPriceCOP: 5000000,
            isLiked: true
          },
          {
            id: "p-12",
            name: 'Sony 50" 4K',
            imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
            priceCOP: 1800000,
            notDiscountPriceCOP: 2200000,
            isLiked: true
          }
        ]
      }
    ];

    // Simulate a delay of 4 seconds
    await new Promise(resolve => setTimeout(resolve, 800));

    return sections;
  }
}