// Imports
import ShoppingCartProduct from "@/models/shopping-cart-product.dto";

// Interface Definition
export interface IShoppingCartService {
  /**
   * Calculates the total cost of the shopping cart.
   * @param products An array of ShoppingCartProduct items.
   * @returns The total price as a number.
   */
  calculateCartTotal(products: ShoppingCartProduct[]): number;

  /**
   * Loads the shopping cart data.
   * @returns A promise that resolves to an array of ShoppingCartProduct items.
   */
  loadCartData(): Promise<ShoppingCartProduct[]>;

  /**
   * Adds a single product to the shopping cart.
   * @param productId The ID of the product to add.
   * @param size The size of the product.
   * @param quantity The quantity to add (default is 1).
   * @returns A promise that resolves when the operation is complete.
   */
  addProductToCart(
    productId: string,
    quantity?: number
  ): Promise<void>;

  /**
   * Adds multiple quantities of a product to the shopping cart.
   * @param productId The ID of the product to add.
   * @param size The size of the product.
   * @param quantity The quantity to add.
   * @returns A promise that resolves when the operation is complete.
   */
  addMultipleProductToShoppingCart(
    productId: string,
    quantity: number
  ): Promise<void>;

  /**
   * Removes a product from the shopping cart.
   * @param productId The ID of the product to remove.
   * @param size The size of the product.
   * @returns A promise that resolves when the operation is complete.
   */
  removeProductFromCart(productId: string): Promise<void>;

  /**
   * Decreases the quantity of a product in the shopping cart by one.
   * @param productId The ID of the product.
   * @param size The size of the product.
   * @returns A promise that resolves when the operation is complete.
   */
  decreaseProductQuantity(productId: string): Promise<void>;
}
