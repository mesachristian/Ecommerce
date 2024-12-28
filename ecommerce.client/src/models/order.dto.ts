import ShoppingCartProduct from "./shopping-cart-product.dto";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string; // Optional field
  city: string;
  postalCode: string;
}
  
export default interface Order{
    orderId: string;
    orderNumber: string;
    userId: string;
    contactEmail : string;
    shippingAddress: ShippingAddress;
    products: ShoppingCartProduct[];
    totalAmount: number;
    orderDate: string;
    status: string;
    createdAt:string;
    estimatedDelivery?: string;
  }