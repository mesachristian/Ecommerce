import ShoppingCartProduct from "@/models/shopping-cart-product.dto";
import { IShoppingCartService } from "../shopping-cart.service";
import { Product } from "@/models";
import { getDatabase, ref, get, set, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

// Constants
const LOCAL_STORAGE_KEY = "guestShoppingCart";
const PRODUCTS_LOCAL_STORAGE_KEY = "products-key";

// Firebase helper to get current user ID
const getUserId = (): string | null => {
  const user = getAuth().currentUser;
  return user ? user.uid : null;
};

export class ShoppingCartFirebaseImpl implements IShoppingCartService {
  private db = getDatabase();

  // Get shopping cart product info
  getShoppingCartProductInfo = async (productId: string): Promise<Product> => {
    const productsData = localStorage.getItem(PRODUCTS_LOCAL_STORAGE_KEY);
    const products = productsData ? JSON.parse(productsData) : [];
    const product = products.find((p: Product) => p.id === productId);

    if (product) {
      return product;
    } else {
      throw new Error("Product not found");
    }
  };

  // Helper: Get shopping cart from local storage
  getLocalCart = (): ShoppingCartProduct[] => {
    const cart = localStorage.getItem(LOCAL_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  };

  // Helper: Save shopping cart to local storage
  saveLocalCart = (cart: ShoppingCartProduct[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  };

  // Helper: Get shopping cart from Firebase
  getFirebaseCart = async (): Promise<ShoppingCartProduct[]> => {
    const userId = getUserId();
    if (!userId) throw new Error("User not logged in");
    const snapshot = await get(ref(this.db, `shoppingCarts/${userId}`));
    return snapshot.exists() ? (snapshot.val() as ShoppingCartProduct[]) : [];
  };

  // Helper: Save shopping cart to Firebase
  saveFirebaseCart = async (cart: ShoppingCartProduct[]): Promise<void> => {
    const userId = getUserId();
    if (!userId) throw new Error("User not logged in");
    await set(ref(this.db, `shoppingCarts/${userId}`), cart);
  };

  // Calculate total cost of the shopping cart
  calculateCartTotal = (products: ShoppingCartProduct[]): number => {
    return products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
  };

  // Load cart data
  loadCartData = async (): Promise<ShoppingCartProduct[]> => {
    const userId = getUserId();
    return userId ? await this.getFirebaseCart() : this.getLocalCart();
  };

  // Add a single product to the shopping cart
  addProductToCart = async (productId: string, quantity: number = 1): Promise<void> => {
    const userId = getUserId();
    if (userId) {
      const cart = await this.getFirebaseCart();
      const existingProduct = cart.find((product) => product.id === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        const prodInfo = await this.getShoppingCartProductInfo(productId);
        cart.push({
          id: prodInfo.id,
          name: prodInfo.name,
          quantity,
          price: prodInfo.priceCOP,
          img: prodInfo.imagesUrls[0],
        });
      }
      await this.saveFirebaseCart(cart);
    } else {
      const localCart = this.getLocalCart();
      const existingProduct = localCart.find((product) => product.id === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        const prodInfo = await this.getShoppingCartProductInfo(productId);
        localCart.push({
          id: prodInfo.id,
          name: prodInfo.name,
          quantity,
          price: prodInfo.priceCOP,
          img: prodInfo.imagesUrls[0],
        });
      }
      this.saveLocalCart(localCart);
    }
  };

  // Add multiple products to the shopping cart
  addMultipleProductToShoppingCart = async (
    productId: string,
    quantity: number
  ): Promise<void> => {
    await this.addProductToCart(productId, quantity);
  };

  // Remove product from shopping cart
  removeProductFromCart = async (productId: string): Promise<void> => {
    const userId = getUserId();
    if (userId) {
      const cart = await this.getFirebaseCart();
      const updatedCart = cart.filter((product) => product.id !== productId);
      await this.saveFirebaseCart(updatedCart);
    } else {
      const localCart = this.getLocalCart().filter((product) => product.id !== productId);
      this.saveLocalCart(localCart);
    }
  };

  // Decrease product quantity in the shopping cart
  decreaseProductQuantity = async (productId: string): Promise<void> => {
    const userId = getUserId();
    if (userId) {
      const cart = await this.getFirebaseCart();
      const product = cart.find((item) => item.id === productId);

      if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          const updatedCart = cart.filter((item) => item.id !== productId);
          await this.saveFirebaseCart(updatedCart);
        } else {
          await this.saveFirebaseCart(cart);
        }
      }
    } else {
      const localCart = this.getLocalCart();
      const product = localCart.find((item) => item.id === productId);

      if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          const updatedCart = localCart.filter((item) => item.id !== productId);
          this.saveLocalCart(updatedCart);
        } else {
          this.saveLocalCart(localCart);
        }
      }
    }
  };
}
