import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from 'lucide-react'
import { useServices } from "@/context/service.context";
import { FavoriteProduct } from "@/models";
import { motion, AnimatePresence } from "motion/react";
import { LoadingComponent } from "@/components/global";

const FavoritesPage = () => {
    // Services
    const { favoritesService, shoppingCartService } = useServices();

    const [favorites, setFavorites] = useState<FavoriteProduct[] | null>(null);

    const loadInitData = async () => {
        setFavorites(await favoritesService.getFavorites());
    }

    const removeFromFavorites = (id: string) => {
        setFavorites(favorites!.filter(product => product.id !== id));
    };

    useEffect(() => {
        loadInitData().catch(console.log);
    }, [])

    if (favorites == null) {
        return (
            <LoadingComponent></LoadingComponent>
        );
    }

    return (
        <>
            {favorites.length === 0 ? (
                <div className="text-center py-12">
                    <Heart className="mx-auto h-16 w-16 text-emerald-300 mb-4" />
                    <p className="text-emerald-600 mb-4">Your favorites list is empty.</p>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Start Shopping</Button>
                </div>
            ) : (
                <AnimatePresence>
                    {
                        favorites.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.3 }}
                                layout
                            >
                                <Card key={product.id} className="overflow-hidden border-none shadow-lg mt-4">
                                    <CardContent className="p-0">
                                        <div className="flex items-center">
                                            <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded-l-lg" />
                                            <div className="flex-grow p-4">
                                                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                                <p className="mb-2">${product.priceCOP}</p>
                                                <div className="flex justify-between items-center">
                                                    <Button size="sm" 
                                                            onClick={()=>{shoppingCartService.addProductToCart(product.id)}}
                                                            className="bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
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
                            </motion.div>
                        ))
                    }
                </AnimatePresence>
            )}
        </>
    )
}

export default FavoritesPage;