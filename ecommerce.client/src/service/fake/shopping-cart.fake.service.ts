// Imports
import ShoppingCartProduct from "@/models/shopping-cart-product.dto";
import { IShoppingCartService } from "../shopping-cart.service";
import { Product } from "@/models";

// Constants
const LOCAL_STORAGE_KEY = "guestShoppingCart";
const PRODUCTS_LOCAL_STORAGE_KEY = "products-key";



export class ShoppingCartFakeImpl implements IShoppingCartService {
  // Function to get product info from local storage
  getShoppingCartProductInfo = async (
    productId: string
  ): Promise<Product> => {
    const productsData = localStorage.getItem(PRODUCTS_LOCAL_STORAGE_KEY);
    console.log(productsData)
    const products = productsData ? JSON.parse(productsData) : [];
    console.log(products, productId)
    // Find the product with the matching productId
    const product = products.find(
      (p:Product) => p.id === productId
    );

    if (product) {
      // Return the product info
      return product;
    } else {
      // Handle product not found
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

  // Calculate total cost of the shopping cart
  calculateCartTotal = (products: ShoppingCartProduct[]): number => {
    return products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
  };

  // Load cart data
  loadCartData = async (): Promise<ShoppingCartProduct[]> => {
    return this.getLocalCart();
  };

  // Add a single product to the shopping cart
  addProductToCart = async (
    productId: string,
    quantity: number = 1
  ): Promise<void> => {
    const localCart = this.getLocalCart();
    const existingProduct = localCart.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      const prodInfo = await this.getShoppingCartProductInfo(productId);
      console.log(prodInfo)
      localCart.push({
        id: prodInfo.id,
        name: prodInfo.name,
        quantity,
        price: prodInfo.priceCOP,
        img: prodInfo.imagesUrls[0],
      });
    }
    this.saveLocalCart(localCart);
  };

  // Add multiple products to the shopping cart
  addMultipleProductToShoppingCart = async (
    productId: string,
    quantity: number
  ): Promise<void> => {
    const localCart = this.getLocalCart();
    const existingProduct = localCart.find(
      (product) => product.id === productId
    );

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
  };

  // Remove product from shopping cart
  removeProductFromCart = async (productId: string): Promise<void> => {
    const localCart = this.getLocalCart().filter(
      (product) => product.id !== productId
    );
    this.saveLocalCart(localCart);
  };

  // Decrease product quantity in the shopping cart
  decreaseProductQuantity = async (productId: string): Promise<void> => {
    const localCart = this.getLocalCart();
    const product = localCart.find((item) => item.id === productId);

    if (product) {
      product.quantity -= 1;
      if (product.quantity <= 0) {
        const updatedCart = localCart.filter(
          (item) => item.id !== productId
        );
        this.saveLocalCart(updatedCart);
      } else {
        this.saveLocalCart(localCart);
      }
    }
  };
}
