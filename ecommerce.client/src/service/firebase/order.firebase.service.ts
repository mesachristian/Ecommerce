import { Order } from "@/models";
import { database } from "@/firebaseConfig";
import { ref, set, child, get } from "firebase/database";
  
  export const saveOrder = async (userId: string, order: Order) => {
    try {
      const orderRef = ref(database, `users/${userId}/orders/${order.orderId}`);
      await set(orderRef, order);
      console.log("Order saved successfully");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  
  export const loadOrderHistory = async (userId: string): Promise<Order[]> => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/orders`));
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        const orders: Order[] = Object.keys(ordersData).map(orderId => ({
          orderId,
          ...ordersData[orderId]
        }));
        return orders;
      } else {
        console.log("No orders found");
        return [];
      }
    } catch (error) {
      console.error("Error loading order history:", error);
      return [];
    }
  };