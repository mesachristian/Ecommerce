import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice: number;
    description: string;
    rating: number;
    reviews: number;
    images: string[];
    colors: string[];
    storage: string[];
}

const product: Product = {
    id: 1,
    name: 'YourPhone 15 Pro',
    price: 699,
    oldPrice: 799,
    description: 'The latest flagship smartphone with advanced camera features and powerful performance. Experience the future of mobile technology with the YourPhone 15 Pro.',
    rating: 4.5,
    reviews: 128,
    images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s',
    ],
    colors: ['Midnight Black', 'Stellar Silver', 'Ocean Blue'],
    storage: ['128GB', '256GB', '512GB'],
}

const relatedProducts = [
    { id: 2, name: 'YourBuds Pro', price: 199, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s' },
    { id: 3, name: 'YourWatch Series 5', price: 299, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s' },
    { id: 4, name: 'YourTab Air', price: 449, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s' },
]

const ProductPage = () => {

    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedStorage, setSelectedStorage] = useState(product.storage[0])

    const { id } = useParams()

    useEffect(() => {
        console.log(id)
    }, []);

    return (
        <div className="max-w-6xl mx-auto flex-grow p-4">
            <div className="mb-8 md:flex md:space-x-8">
                {/* Product Images */}
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <div className="relative aspect-square mb-4">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="rounded-lg object-cover h-full w-full"
                        />
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-emerald-500' : 'border-transparent'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Information */}
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.floor(product.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews} reviews)
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="text-3xl font-bold text-emerald-600">£{product.price}</span>
                            <span className="text-lg text-gray-500 line-through ml-2">£{product.oldPrice}</span>
                        </div>
                        <Button variant="outline" size="icon">
                            <Heart className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Color</h3>
                        <div className="flex space-x-2">
                            {product.colors.map((color) => (
                                <Button
                                    key={color}
                                    variant={selectedColor === color ? 'default' : 'outline'}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {color}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Storage</h3>
                        <div className="flex space-x-2">
                            {product.storage.map((size) => (
                                <Button
                                    key={size}
                                    variant={selectedStorage === size ? 'default' : 'outline'}
                                    onClick={() => setSelectedStorage(size)}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full mb-4" size="lg">
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="description" className="mb-8">
                <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                    <Card>
                        <CardContent className="pt-6">
                            <p>
                                The YourPhone 15 Pro is the pinnacle of smartphone technology.
                                Featuring a stunning 6.1-inch Super Retina XDR display, a powerful
                                A15 Bionic chip, and an advanced triple-lens camera system, this
                                device is designed to elevate your mobile experience.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="specifications">
                    <Card>
                        <CardContent className="pt-6">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>6.1-inch Super Retina XDR display</li>
                                <li>A15 Bionic chip</li>
                                <li>5G capable</li>
                                <li>Triple-lens rear camera system</li>
                                <li>Face ID for secure authentication</li>
                                <li>iOS 15</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="reviews">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            {[
                                { name: 'Alice Johnson', rating: 5, comment: 'Absolutely love this phone! The camera quality is outstanding.' },
                                { name: 'Bob Smith', rating: 4, comment: 'Great phone overall, but battery life could be better.' },
                                { name: 'Carol White', rating: 5, comment: 'The performance is incredible. Best phone Ive ever owned!' },
                            ].map((review, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <Avatar>
                                        <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold">{review.name}</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < review.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 mt-1">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div>
                <h3 className="text-xl font-bold mb-4">Related Products</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {relatedProducts.map((product) => (
                        <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <CardContent className="p-4">
                                <div className="relative aspect-square mb-2">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="rounded-md object-cover fill h-full w-full"
                                    />
                                </div>
                                <h4 className="font-semibold truncate">{product.name}</h4>
                                <p className="text-emerald-600 font-bold">£{product.price}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;