import { Bell, Home, Search, ShoppingCart, Star, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Route, Routes, useNavigate } from 'react-router-dom'
import {
    CartPage,
    CatalogPage,
    FavoritesPage,
    HomePage,
    ProfilePage
} from '@/pages';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useMemo, useState } from 'react';
import { BottomSheetContext } from '@/context/bottom-sheet.context';
import { MobileProductSheet } from '@/components/mobile';
import 'react-spring-bottom-sheet/dist/style.css';

function App() {

    const [showProductBottomSheet, setShowProductBottomSheet] = useState<boolean>(false);

    const [productIdBS, setProductIdBS] = useState<string | null>(null);

    const showProductBottomSheetCallback = (id: string) => {
        setProductIdBS(id);
        setShowProductBottomSheet(true);
    }

    const value = useMemo(() => ({
        showProductBottomSheetCallback
    }), []);

    return (
        <BottomSheetContext.Provider value={value}>
            <div className="flex flex-col min-h-screen bg-gray-50">

                <AppHeader />

                <main className="flex-grow p-4 mb-16 flex flex-col">
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/catalog" element={<CatalogPage />}></Route>
                        <Route path="/cart" element={<CartPage />}></Route>
                        <Route path="/favorites" element={<FavoritesPage />}></Route>
                        <Route path="/profile" element={<ProfilePage />}></Route>
                    </Routes>
                </main>

                <AppFooter />

                <BottomSheet  
                    open={showProductBottomSheet}
                    onDismiss={() => setShowProductBottomSheet(false)}>
                    <MobileProductSheet productId={productIdBS} />
                </BottomSheet>
            </div>


        </BottomSheetContext.Provider>
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