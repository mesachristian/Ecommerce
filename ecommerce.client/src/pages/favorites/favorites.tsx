import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from 'lucide-react'

interface FavoriteProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}

const FavoritesPage = () => {

    const [favorites, setFavorites] = useState<FavoriteProduct[]>([
        { id: '1', name: 'YourPhone 15 Pro', price: 699, image: 'https://m.media-amazon.com/images/I/71dRtTqxghL.jpg' },
        { id: '2', name: 'YourBuds Pro', price: 69, image: 'https://m.media-amazon.com/images/I/71dRtTqxghL.jpg' },
        { id: '3', name: 'YourTab Air', price: 449, image: 'https://m.media-amazon.com/images/I/71dRtTqxghL.jpg' },
        { id: '4', name: 'YourWatch Series 5', price: 299, image: 'https://m.media-amazon.com/images/I/71dRtTqxghL.jpg' },
    ]);

    const removeFromFavorites = (id: string) => {
        setFavorites(favorites.filter(product => product.id !== id));
    };

    return (
        <>
            {favorites.length === 0 ? (
                <div className="text-center py-12">
                    <Heart className="mx-auto h-16 w-16 text-emerald-300 mb-4" />
                    <p className="text-emerald-600 mb-4">Your favorites list is empty.</p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Start Shopping</Button>
                </div>
            ) : (
                favorites.map((product) => (
                    <Card key={product.id} className="overflow-hidden border-none shadow-lg">
                        <CardContent className="p-0">
                            <div className="flex items-center">
                                <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-l-lg" />
                                <div className="flex-grow p-4">
                                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                    <p className="mb-2">${product.price}</p>
                                    <div className="flex justify-between items-center">
                                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFromFavorites(product.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </>
    )
}

export default FavoritesPage;