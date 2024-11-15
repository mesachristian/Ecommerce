import { Bell, Home, Search, ShoppingCart, Star, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Route, Routes, useNavigate } from 'react-router-dom'

import {
    CartPage,
    CatalogPage,
    FavoritesPage,
    HomePage,
    ProfilePage
} from '@/pages';

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">

            <AppHeader />

            <main className="flex-grow p-4 mb-16">
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/catalog" element={<CatalogPage />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/favorites" element={<FavoritesPage />}></Route>
                    <Route path="/profile" element={<ProfilePage />}></Route>
                </Routes>
            </main>

            <AppFooter />
        </div>
    );

}

const AppHeader = () => {
    return (
        <header className="bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">YT</span>
                    </div>
                    <h1 className="text-lg font-semibold text-emerald-700">YourTech</h1>
                </div>
                <Bell className="text-gray-600" />
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Search the entire shop"
                    className="pl-10 w-full"
                />
            </div>
        </header>
    )
}

const AppFooter = () => {

    const navigate = useNavigate();

    const MOBILE_NAV_ELEMENTS = [
        { icon: Home, label: 'Home', url: '/' },
        { icon: Search, label: 'Catalog', url: '/catalog' },
        { icon: ShoppingCart, label: 'Cart', url: '/cart' },
        { icon: Star, label: 'Favorites', url: '/favorites' },
        { icon: User, label: 'Profile', url: '/profile' },
    ];

    const handleClick = (url: string) => {
        navigate(url);
    }

    return (
        <footer className="bg-white border-t border-gray-200 p-4 w-full fixed bottom-0">
            <nav className="flex justify-between">
                {MOBILE_NAV_ELEMENTS.map(({ icon: Icon, label, url }) => (
                    <Button key={label} variant="ghost" className="flex flex-col items-center" onClick={() => handleClick(url)}>
                        <Icon className="h-6 w-6" />
                        <span className="text-xs mt-1">{label}</span>
                    </Button>
                ))}
            </nav>
        </footer>
    )
}

// Add components: npx shadcn@latest add button

export default App;