'use client'

import { useState } from 'react'
import { Bell, Home, Search, ShoppingCart, Star, User, Heart, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function FavoritesPageMobile() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([
    { id: '1', name: 'YourPhone 15 Pro', price: 699, image: '/placeholder.svg?height=200&width=200' },
    { id: '2', name: 'YourBuds Pro', price: 69, image: '/placeholder.svg?height=200&width=200' },
    { id: '3', name: 'YourTab Air', price: 449, image: '/placeholder.svg?height=200&width=200' },
    { id: '4', name: 'YourWatch Series 5', price: 299, image: '/placeholder.svg?height=200&width=200' },
  ]);

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(product => product.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-emerald-600">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold text-emerald-700">My Favorites</h1>
          </div>
          <Bell className="text-emerald-600" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
          <Input 
            placeholder="Search your favorites" 
            className="pl-10 w-full bg-emerald-50 border-emerald-100 text-emerald-900 placeholder-emerald-400"
          />
        </div>
      </header>

      <main className="flex-grow p-4 space-y-4">
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
                    <h3 className="font-semibold text-lg mb-1 text-emerald-800">{product.name}</h3>
                    <p className="text-emerald-600 font-bold mb-2">£{product.price}</p>
                    <div className="flex justify-between items-center">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromFavorites(product.id)}
                        className="text-emerald-600 hover:text-emerald-700"
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
      </main>

      <footer className="bg-white border-t border-emerald-100 p-4 sticky bottom-0">
        <nav className="flex justify-between">
          {[
            { icon: Home, label: 'Home' },
            { icon: Search, label: 'Catalog' },
            { icon: ShoppingCart, label: 'Cart' },
            { icon: Star, label: 'Favorites' },
            { icon: User, label: 'Profile' },
          ].map(({ icon: Icon, label }) => (
            <Button key={label} variant="ghost" className="flex flex-col items-center text-emerald-600 hover:text-emerald-700">
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </Button>
          ))}
        </nav>
      </footer>
    </div>
  )
}