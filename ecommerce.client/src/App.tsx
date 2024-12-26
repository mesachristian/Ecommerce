import { Bell, Home, Search, ShoppingCart, Star, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Route, Routes, useNavigate } from 'react-router'
import {
    CartPage,
    CatalogPage,
    FavoritesPage,
    HomePage,
    NotFoundPage,
    ProductPage,
    ProfilePage,
    SignInPage,
    SignUpPage,
    Checkout
} from '@/pages';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useMemo, useState } from 'react';
import { BottomSheetContext } from '@/context/bottom-sheet.context';
import { MobileProductSheet } from '@/components/mobile';
import 'react-spring-bottom-sheet/dist/style.css';

const NAV_ELEMENTS = [
    { icon: Home, label: 'Home', url: '/', id: 'nav-1' },
    { icon: Search, label: 'Catalog', url: '/catalog', id: 'nav-2' },
    { icon: Star, label: 'Favorites', url: '/favorites', id: 'nav-4' },
    { icon: ShoppingCart, label: 'Cart', url: '/cart', id: 'nav-3' },
    { icon: User, label: 'Profile', url: '/profile', id: 'nav-5' },
];

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

                <main className="flex-grow mb-16 flex flex-col">
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/catalog" element={<CatalogPage />}></Route>
                        <Route path="/cart" element={<CartPage />}></Route>
                        <Route path="/favorites" element={<FavoritesPage />}></Route>
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path='/signin' element={<SignInPage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                        <Route path='/checkout' element={<Checkout/>} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </main>

                <AppFooter />

                <BottomSheet
                    className='md:hidden'
                    open={showProductBottomSheet}
                    onDismiss={() => setShowProductBottomSheet(false)}>
                    <MobileProductSheet productId={productIdBS} />
                </BottomSheet>
            </div>


        </BottomSheetContext.Provider>
    );

}

const AppHeader = () => {
    const navigate = useNavigate();

    const handleNavClick = (url: string) => {
        navigate(url);
    }
    return (
        <header className="bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">YT</span>
                    </div>
                    <h1 className="text-lg font-semibold text-emerald-700">YourTech</h1>
                </div>

                <div>
                    <ul className='list-none ml-auto hidden md:flex gap-6'>
                        {
                            NAV_ELEMENTS.map(({ icon: Icon, label, url }, idx: number) => {
                                return(
                                    <li onClick={() => handleNavClick(url)} className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:cursor-pointer hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'>
                                        {
                                            idx < 3 && <span>{label}</span>
                                        }
                                        {
                                            idx >= 3 && <div><Icon size={20}/></div>
                                        }
                                    </li>
                                );
                            })
                        }
                    </ul>

                    { /** MOBILE */}
                    <div className='md:hidden'>
                        <Bell className="text-gray-600" />
                    </div>
                </div>
                
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
        <footer className="bg-white border-t border-gray-200 p-4 w-full fixed bottom-0 md:hidden">
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