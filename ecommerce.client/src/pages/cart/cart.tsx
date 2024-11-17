import { useEffect, useState } from 'react'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import CryptoJS from 'crypto-js';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

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



    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: 1, name: 'YourPhone 15 Pro', price: 699, quantity: 1, image: 'https://team8.se/wp-content/uploads/2022/06/809dd429-c812-41db-a1b6-ef43b27a866d.jpg' },
        { id: 2, name: 'YourBuds Pro', price: 69, quantity: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s' },
    ]);

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    function generateMD5Hash(text: string): string {
        return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex);
    }

    useEffect(() => {
        const tempPaymentData: PaymentData = {
            accountId: '512321',
            merchantId: '508029',
            apiLogin: 'pRRXKOl8ikMmt9u',
            apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
            publicKey: 'PKaC6H4cEDJD919n705L544kSU',
            referenceCode: TEST_REFERENCE,
            signature: ''
        };
        tempPaymentData.signature = generateMD5Hash(`${tempPaymentData.apiKey}~${tempPaymentData.merchantId}~${tempPaymentData.referenceCode}~20000~COP`);
        setPaymentData(tempPaymentData);
    }, []);

    if (paymentData == null) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <div className="flex-grow bg-gray-100 py-8 flex flex-col">
            <div className="px-4 flex flex-col flex-grow">
                <h1 className="text-2xl font-bold mb-8 flex items-center">
                    <ShoppingBag className="mr-2" />
                    Your Cart
                </h1>
                {cartItems.length === 0 ? (
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-center text-gray-500">Your cart is empty</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className='flex-grow flex flex-col justify-between'>
                        <div>
                            {cartItems.map((item) => (
                                <Card key={item.id} className="mb-4">
                                    <CardContent className="p-4">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                                            <div className="flex-grow">
                                                <h2 className="font-semibold">{item.name}</h2>
                                                <p className="text-sm text-gray-500">£{item.price}</p>
                                                <div className="flex items-center mt-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeItem(item.id)}
                                                className="ml-4"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div>
                            <Separator className="my-4" />
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold text-lg">£{totalPrice.toFixed(2)}</span>
                            </div>

                            <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                                <input name="merchantId" type="hidden" value={paymentData.merchantId} />
                                <input name="accountId" type="hidden" value={paymentData.accountId} />
                                <input name="description" type="hidden" value="Test PAYU" />
                                <input name="referenceCode" type="hidden" value={paymentData.referenceCode} />
                                <input name="amount" type="hidden" value="20000" />
                                <input name="tax" type="hidden" value="3193" />
                                <input name="taxReturnBase" type="hidden" value="16806" />
                                <input name="currency" type="hidden" value="COP" />
                                <input name="signature" type="hidden" value={paymentData.signature} />
                                <input name="responseUrl" type="hidden" value="http://www.test.com/response" />
                                <input name="confirmationUrl" type="hidden" value="http://www.test.com/confirmation" />
                                <Button name="Submit" type="submit" className="w-full" size="lg">
                                    Proceed to Checkout
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage;