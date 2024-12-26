"use client";

import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import ShoppingCartProduct from "@/models/shopping-cart-product.dto";
import { ShoppingCartFirebaseImpl } from "@/service/firebase/shopping-cart.firebase.service";
import { Order } from "@/models";
import { saveOrder } from "@/service/firebase/order.firebase.service";

// Instantiate your shipping service
const shippingService = new ShoppingCartFirebaseImpl();

export default function CheckoutPage() {

  // Local state for cart and form data
  const [cart, setCart] = useState<ShoppingCartProduct[]>([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Load cart data on mount
  useEffect(() => {
    (async () => {
      const loadedCart = await shippingService.loadCartData();
      setCart(loadedCart);
    })();
  }, []);

  // Helper to recalculate total
  const calculateSubtotal = (): number => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  // In a real app, shipping might be dynamically calculated
  const shippingCost = 200_000; // e.g. 0.2M

  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

  // Increment cart item
  const handleIncrement = async (productId: string) => {
    await shippingService.addProductToCart(productId, 1);
    setCart(await shippingService.loadCartData());
  };

  // Decrement cart item
  const handleDecrement = async (productId: string) => {
    await shippingService.decreaseProductQuantity(productId);
    setCart(await shippingService.loadCartData());
  };

  // Handle form submission
  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Build up the order object
    const userId = "YOUR_USER_ID"; // Replace with real user ID retrieval
    const orderId = `order-${Date.now()}`; // Example order ID

    const newOrder: Order = {
      orderId,
      userId,
      products: cart,
      contactEmail: email,
      shippingAddress: {
        firstName,
        lastName,
        address,
        apartment,
        city,
        postalCode,
      },
      createdAt: new Date().toISOString(),
      // Add other fields as needed
    };

    // Save the order via order service
    await saveOrder(userId, newOrder);


  };

  return (
    <div className="min-h-screen md:flex md:justify-center">
      <div className="px-4 py-4 md:w-[800px] space-y-4">
        <h1 className="text-xl font-semibold">Checkout</h1>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="font-semibold text-base">Order Summary</h2>

            {/* Dynamically render cart products */}
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
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-xs">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Separator className="my-2" />

            {/* Order Totals */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${(subtotal / 1_000_000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>${(shippingCost / 1_000_000).toFixed(1)}M</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(total / 1_000_000).toFixed(1)}M</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-2">
            <h2 className="font-semibold text-base">Contact Information</h2>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          <div className="space-y-2">
            <h2 className="font-semibold text-base">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-sm">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  required
                  className="text-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-sm">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  required
                  className="text-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="address" className="text-sm">
                Street Address
              </Label>
              <Input
                id="address"
                required
                className="text-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="apartment" className="text-sm">
                Apartment, suite, etc. (optional)
              </Label>
              <Input
                id="apartment"
                className="text-sm"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="city" className="text-sm">
                  City
                </Label>
                <Input
                  id="city"
                  required
                  className="text-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="postalCode" className="text-sm">
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  required
                  className="text-sm"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            size="lg"
          >
            Continue to Payment
          </Button>
        </form>
      </div>
    </div>
  );
}
