"use client";

import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CryptoJS from "crypto-js";

import ShoppingCartProduct from "@/models/shopping-cart-product.dto";
import { ShoppingCartFirebaseImpl } from "@/service/firebase/shopping-cart.firebase.service";
import { Order } from "@/models";
import { saveOrder } from "@/service/firebase/order.firebase.service";

const shippingService = new ShoppingCartFirebaseImpl();

interface PaymentData {
  accountId: string;
  merchantId: string;
  apiKey: string;
  referenceCode: string;
  signature: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<ShoppingCartProduct[]>([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const shippingCost = 10_0000; // Example shipping cost
  const calculateSubtotal = (): number => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

  useEffect(() => {
    (async () => {
      const loadedCart = await shippingService.loadCartData();
      setCart(loadedCart);
    })();
  }, []);

  useEffect(() => {
    if (!total) return;

    const referenceCode = `REF-${Date.now()}`;
    const apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
    const merchantId = "508029";
    const accountId = "512321";

    const generateMD5Hash = (text: string) =>
      CryptoJS.MD5(text).toString(CryptoJS.enc.Hex);

    const signature = generateMD5Hash(
      `${apiKey}~${merchantId}~${referenceCode}~${total.toFixed(2)}~COP`
    );

    setPaymentData({
      accountId,
      merchantId,
      apiKey,
      referenceCode,
      signature,
    });
  }, [total]);

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    if (!paymentData) {
      alert("Payment data is not ready. Please try again.");
      return;
    }
  
    const userId = "YOUR_USER_ID"; // Replace with real user ID retrieval
    const orderId = `order-${Date.now()}`;
    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const status = "Pending";
    const orderDate = new Date().toISOString();
  
    const newOrder: Order = {
      orderId,
      orderNumber,
      userId,
      contactEmail: email,
      shippingAddress: {
        firstName,
        lastName,
        address,
        apartment,
        city,
        postalCode,
      },
      products: cart,
      totalAmount: total,
      orderDate,
      status,
      createdAt: new Date().toISOString(),
    };
  
    try {
      await saveOrder(userId, newOrder);
      console.log("Order saved successfully.");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to save order. Please try again.");
      return;
    }
  
    // Ensure the form is submitted after processing
    const form = e.target as HTMLFormElement; // Explicitly cast e.target to HTMLFormElement
    form.submit();
  };

  if (!paymentData) {
    return <div>Loading payment details...</div>;
  }

  return (
    <div className="min-h-screen md:flex md:justify-center">
      <div className="px-4 py-4 md:w-[800px] space-y-4">
        <h1 className="text-xl font-semibold">Checkout</h1>

        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="font-semibold text-base">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.img ?? "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="font-medium text-sm">
                      ${(item.price / 1_000_000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${(subtotal / 1_000_000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${(shippingCost / 1_000_000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${(total / 1_000_000).toFixed(1)}M</span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <form
          onSubmit={handleSubmitOrder}
          method="post"
          action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
        >
          <div className="space-y-2">
            <h2 className="font-semibold text-base">Contact Information</h2>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <h2 className="font-semibold text-base">Shipping Address</h2>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Label htmlFor="apartment">Apartment</Label>
            <Input
              id="apartment"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          {/* Hidden Inputs for PayU */}
          <input type="hidden" name="merchantId" value={paymentData.merchantId} />
          <input type="hidden" name="accountId" value={paymentData.accountId} />
          <input type="hidden" name="description" value="Order Payment" />
          <input
            type="hidden"
            name="referenceCode"
            value={paymentData.referenceCode}
          />
          <input type="hidden" name="amount" value={total.toFixed(2)} />
          <input type="hidden" name="tax" value="0" />
          <input type="hidden" name="taxReturnBase" value="0" />
          <input type="hidden" name="currency" value="COP" />
          <input type="hidden" name="signature" value={paymentData.signature} />
          <input
            type="hidden"
            name="responseUrl"
            value="http://your-site.com/response"
          />
          <input
            type="hidden"
            name="confirmationUrl"
            value="http://your-site.com/confirmation"
          />

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Continue to Payment
          </Button>
        </form>
      </div>
    </div>
  );
}
