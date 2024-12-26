interface OrderProduct {
    title: string;
    quantity: number;
    price: number;
    size: string;
    img: string;
    color: string; // Assuming each product has a color attribute
  }
  
export default interface Order {
    orderId: string;
    orderNumber: string;
    userId: string;
    products: OrderProduct[];
    totalAmount: number;
    orderDate: string;
    status: string;
    estimatedDelivery?: string;
  }