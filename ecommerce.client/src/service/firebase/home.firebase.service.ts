// HomeServiceFirebaseImpl.ts
import { database } from "@/firebaseConfig";
import { IHomeService } from "../home.service";
import { ref, child, get, DatabaseReference } from "firebase/database";
import { CategoryMiniature, HomeSection, Product } from "@/models";

export class HomeServiceFirebaseImpl implements IHomeService {
  private dbRef: DatabaseReference;

  constructor() {
    this.dbRef = ref(database);
  }

  /**
   * Fetches all categories from the Firebase Realtime Database.
   * @returns Promise resolving to an array of CategoryMiniature.
   */
  async getCategories(): Promise<CategoryMiniature[]> {
    try {
      //return [];
      const snapshot = await get(child(this.dbRef, `categories`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Assuming data is an object where each key is a category ID
        const categories: CategoryMiniature[] = Object.values(data);
        return categories;
      } else {
        console.warn("No categories available");
        return [];
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  /**
   * Fetches all home sections from the Firebase Realtime Database.
   * @returns Promise resolving to an array of HomeSection.
   */
  async getHomeSections(): Promise<HomeSection[]> {
    try {
      //return [];
      const snapshot = await get(child(this.dbRef, `homeSections`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Assuming data is an object where each key is a section ID
        const sections: HomeSection[] = Object.values(data);
        return sections;
      } else {
        console.warn("No home sections available");
        return [];
      }
    } catch (error) {
      console.error("Error fetching home sections:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

}