import { IShoppingCartService } from "../shopping-cart.service";
import { database } from "@/firebase";
import { ref, set, child, get, remove } from "firebase/database";
import { getProductDetailInfo } from "@/";
import { isAuthenticated, getUserId } from "@/auth"; // Mock authentication utility


export class ShoppingCartFirebaseImpl implements IShoppingCartService {

interface ShoppingCartProduct {
  title: string;
  quantity: number;
  price: number;
  size: string;
  img: string;
}

const LOCAL_STORAGE_KEY = "guestShoppingCart";

// Helper: Get shopping cart from local storage
const getLocalCart = (): ShoppingCartProduct[] => {
  const cart = localStorage.getItem(LOCAL_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Helper: Save shopping cart to local storage
const saveLocalCart = (cart: ShoppingCartProduct[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
};

// Calculate total cost of the shopping cart
export const calculateCartTotal = (products: ShoppingCartProduct[]): number => {
  return products.reduce((acc, product) => acc + product.quantity * product.price, 0);
};

// Load cart data, with authentication check
export const loadCartData = async (): Promise<ShoppingCartProduct[]> => {
  if (!isAuthenticated()) {
    return getLocalCart();
  }

  const userId = getUserId();
  if (!userId) throw new Error("Unable to load cart: User ID is missing.");

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${userId}/cart`));
    const products: ShoppingCartProduct[] = [];

    if (snapshot.exists()) {
      const cartData = snapshot.val();
      for (const productId in cartData) {
        const sizes = cartData[productId];
        for (const size in sizes) {
          const quantity = sizes[size].quantity;
          const prodInfo = await getProductDetailInfo(productId);
          products.push({
            title: prodInfo.title,
            quantity,
            price: prodInfo.price,
            size,
            img: prodInfo.picture1,
          });
        }
      }
    }
    return products;
  } catch (error) {
    console.error("Error loading cart data:", error);
    return [];
  }
};

// Add a single product to the shopping cart
export const addProductToCart = async (
  productId: string,
  size: string,
  quantity: number = 1
) => {
  if (!isAuthenticated()) {
    const localCart = getLocalCart();
    const existingProduct = localCart.find(
      (product) => product.title === productId && product.size === size
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      const prodInfo = await getProductDetailInfo(productId);
      localCart.push({
        title: prodInfo.title,
        quantity,
        price: prodInfo.price,
        size,
        img: prodInfo.picture1,
      });
    }
    saveLocalCart(localCart);
    return;
  }

  const userId = getUserId();
  if (!userId) throw new Error("Unable to add product: User ID is missing.");

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${userId}/cart/${productId}/${size}/quantity`));
    const newQuantity = snapshot.exists() ? snapshot.val() + quantity : quantity;

    await set(ref(database, `users/${userId}/cart/${productId}/${size}/quantity`), newQuantity);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

// Add multiple products to the shopping cart
export const addMultipleProductToShoppingCart = async (
  productId: string,
  size: string,
  quantity: number
) => {
  if (!isAuthenticated()) {
    const localCart = getLocalCart();
    const existingProduct = localCart.find(
      (product) => product.title === productId && product.size === size
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      const prodInfo = await getProductDetailInfo(productId);
      localCart.push({
        title: prodInfo.title,
        quantity,
        price: prodInfo.price,
        size,
        img: prodInfo.picture1,
      });
    }
    saveLocalCart(localCart);
    return;
  }

  const userId = getUserId();
  if (!userId) throw new Error("Unable to add products: User ID is missing.");

  try {
    const dbRef = ref(database);
    const snapshot = await get(
      child(dbRef, `users/${userId}/cart/${productId}/${size}/quantity`)
    );

    const newQuantity = snapshot.exists() ? snapshot.val() + quantity : quantity;

    await set(ref(database, `users/${userId}/cart/${productId}/${size}/quantity`), newQuantity);
  } catch (error) {
    console.error("Error adding multiple products to cart:", error);
  }
};

// Remove product from shopping cart
export const removeProductFromCart = async (productId: string, size: string) => {
  if (!isAuthenticated()) {
    const localCart = getLocalCart().filter(
      (product) => product.title !== productId || product.size !== size
    );
    saveLocalCart(localCart);
    return;
  }

  const userId = getUserId();
  if (!userId) throw new Error("Unable to remove product: User ID is missing.");

  try {
    await remove(ref(database, `users/${userId}/cart/${productId}/${size}`));
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};

// Decrease product quantity in the shopping cart
export const decreaseProductQuantity = async (productId: string, size: string) => {
  if (!isAuthenticated()) {
    const localCart = getLocalCart();
    const product = localCart.find(
      (item) => item.title === productId && item.size === size
    );

    if (product) {
      product.quantity -= 1;
      if (product.quantity <= 0) {
        const updatedCart = localCart.filter(
          (item) => item.title !== productId || item.size !== size
        );
        saveLocalCart(updatedCart);
      } else {
        saveLocalCart(localCart);
      }
    }
    return;
  }

  const userId = getUserId();
  if (!userId) throw new Error("Unable to decrease quantity: User ID is missing.");

  try {
    const dbRef = ref(database);
    const snapshot = await get(
      child(dbRef, `users/${userId}/cart/${productId}/${size}/quantity`)
    );

    if (snapshot.exists()) {
      const newQuantity = Math.max(0, snapshot.val() - 1);
      if (newQuantity === 0) {
        await remove(ref(database, `users/${userId}/cart/${productId}/${size}`));
      } else {
        await set(
          ref(database, `users/${userId}/cart/${productId}/${size}/quantity`),
          newQuantity
        );
      }
    }
  } catch (error) {
    console.error("Error decreasing product quantity:", error);
  }
};
}


