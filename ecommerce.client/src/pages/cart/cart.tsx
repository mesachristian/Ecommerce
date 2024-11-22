import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CryptoJS from "crypto-js";
import { useServices } from "@/context/service.context";
import ShoppingCartProduct from "@/models/shopping-cart-product.dto";
import { AnimatePresence, motion } from "motion/react";

interface PaymentData {
  accountId: string;
  merchantId: string;
  apiLogin: string;
  apiKey: string;
  publicKey: string;
  referenceCode: string;
  signature: string;
}

const TEST_REFERENCE = "F5FPXGcgx";

const CartPage = () => {
  const { shoppingCartService } = useServices();

  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const [cartItems, setCartItems] = useState<ShoppingCartProduct[] | null>(
    null
  );

  const loadInitData = async () => {
    setCartItems(await shoppingCartService.loadCartData());
  };

  const addProduct = async (id: string) => {
    shoppingCartService.addProductToCart(id);
    loadInitData();
  };

  const decreaseProduct = async (id: string) => {
    shoppingCartService.decreaseProductQuantity(id);
    loadInitData();
  };

  const removeProduct = async (id: string) => {
    shoppingCartService.removeProductFromCart(id);
    loadInitData();
  };

  function generateMD5Hash(text: string): string {
    return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex);
  }

  useEffect(() => {
    loadInitData().catch(console.log);
    const tempPaymentData: PaymentData = {
      accountId: "512321",
      merchantId: "508029",
      apiLogin: "pRRXKOl8ikMmt9u",
      apiKey: "4Vj8eK4rloUd272L48hsrarnUA",
      publicKey: "PKaC6H4cEDJD919n705L544kSU",
      referenceCode: TEST_REFERENCE,
      signature: "",
    };
    tempPaymentData.signature = generateMD5Hash(
      `${tempPaymentData.apiKey}~${tempPaymentData.merchantId}~${tempPaymentData.referenceCode}~20000~COP`
    );
    setPaymentData(tempPaymentData);
  }, []);

  if (paymentData == null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="px-4 flex flex-col flex-grow">
      <h1 className="text-2xl font-bold mb-8 flex items-center">
        <ShoppingBag className="mr-2" />
        Your Cart
      </h1>
      {cartItems?.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">Your cart is empty</p>
          </CardContent>
        </Card>
      ) : (
        <div className=" flex flex-col justify-between">
          <AnimatePresence>
            {cartItems?.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div className="flex-grow">
                        <h2 className="font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-500">£{item.price}</p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => decreaseProduct(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addProduct(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeProduct(item.id)}
                        className="ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          <div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">£{}</span>
            </div>

            <form
              method="post"
              action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
            >
              <input
                name="merchantId"
                type="hidden"
                value={paymentData.merchantId}
              />
              <input
                name="accountId"
                type="hidden"
                value={paymentData.accountId}
              />
              <input name="description" type="hidden" value="Test PAYU" />
              <input
                name="referenceCode"
                type="hidden"
                value={paymentData.referenceCode}
              />
              <input name="amount" type="hidden" value="20000" />
              <input name="tax" type="hidden" value="3193" />
              <input name="taxReturnBase" type="hidden" value="16806" />
              <input name="currency" type="hidden" value="COP" />
              <input
                name="signature"
                type="hidden"
                value={paymentData.signature}
              />
              <input
                name="responseUrl"
                type="hidden"
                value="http://www.test.com/response"
              />
              <input
                name="confirmationUrl"
                type="hidden"
                value="http://www.test.com/confirmation"
              />
              <Button name="Submit" type="submit" className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
