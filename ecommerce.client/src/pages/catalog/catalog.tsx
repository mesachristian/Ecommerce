import { Card, CardContent } from "@/components/ui/card"
import { Heart, Search, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContext, useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { BottomSheetContext } from "@/context/bottom-sheet.context"

interface Product {
    id: string;
    name: string;
    category: string;
    imageUrl: string;
    priceCOP: number;
    notDiscountPriceCOP: number | null;
    isLiked: boolean;
}

const products: Product[] = [
    {
        id: "p-0",
        name: "Sony 50\" 4K",
        category: "television",
        imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
        priceCOP: 1800000,
        notDiscountPriceCOP: 2200000,
        isLiked: false
    },
    {
        id: "p-1",
        name: "MacBook Air M2",
        category: 'phone',
        imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
        priceCOP: 5000000,
        notDiscountPriceCOP: null,
        isLiked: true
    },
    {
        id: "p-2",
        name: "Sony 50\" 4K",
        category: "television",
        imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
        priceCOP: 1800000,
        notDiscountPriceCOP: 2200000,
        isLiked: false
    },
    {
        id: "p-3",
        name: "MacBook Air M2",
        category: 'phone',
        imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
        priceCOP: 5000000,
        notDiscountPriceCOP: null,
        isLiked: true
    },
    {
        id: "p-4",
        name: "Sony 50\" 4K",
        category: "television",
        imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
        priceCOP: 1800000,
        notDiscountPriceCOP: 2200000,
        isLiked: false
    },
    {
        id: "p-5",
        name: "MacBook Air M2",
        category: 'phone',
        imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
        priceCOP: 5000000,
        notDiscountPriceCOP: null,
        isLiked: true
    },
    {
        id: "p-12",
        name: "Sony 50\" 4K",
        category: "television",
        imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
        priceCOP: 1800000,
        notDiscountPriceCOP: 2200000,
        isLiked: false
    },
    {
        id: "p-6",
        name: "MacBook Air M2",
        category: 'phone',
        imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
        priceCOP: 5000000,
        notDiscountPriceCOP: null,
        isLiked: true
    },
    {
        id: "p-7",
        name: "Sony 50\" 4K",
        category: "television",
        imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
        priceCOP: 1800000,
        notDiscountPriceCOP: 2200000,
        isLiked: false
    },
    {
        id: "p-8",
        name: "MacBook Air M2",
        category: 'phone',
        imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
        priceCOP: 5000000,
        notDiscountPriceCOP: null,
        isLiked: true
    },
];

const CatalogPage = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [priceRange, setPriceRange] = useState([0, 1500])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const categories = Array.from(new Set(products.map(p => p.category)))

    const applyFilters = () => {
        const filtered = products.filter(product =>
            (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase())) //&&
            //(selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
            //(product.price >= priceRange[0] && product.price <= priceRange[1])
        )
        setFilteredProducts(filtered)
    }

    const { showProductBottomSheetCallback } = useContext(BottomSheetContext);

    return (
        <>
            <div className="flex items-center space-x-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                    <Input
                        placeholder="Search products"
                        className="pl-10 w-full bg-emerald-50 border-emerald-100 text-emerald-900 placeholder-emerald-400"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            applyFilters()
                        }}
                    />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-bold text-emerald-700">Filters</SheetTitle>
                            <SheetDescription className="text-emerald-600">
                                Refine your product search
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-emerald-800">Categories</h3>
                                <div className="space-y-3">
                                    {categories.map(category => (
                                        <div key={category} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={category}
                                                checked={selectedCategories.includes(category)}
                                                onCheckedChange={(checked) => {
                                                    setSelectedCategories(prev =>
                                                        checked
                                                            ? [...prev, category]
                                                            : prev.filter(c => c !== category)
                                                    )
                                                }}
                                                className="border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <Label htmlFor={category} className="text-emerald-700">{category}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-emerald-800">Price Range</h3>
                                <Slider
                                    min={0}
                                    max={1500}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    className="mb-4"
                                />
                                <div className="flex justify-between text-sm text-emerald-600">
                                    <span>£{priceRange[0]}</span>
                                    <span>£{priceRange[1]}</span>
                                </div>
                            </div>
                        </div>
                        <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t border-gray-200">
                            <SheetClose asChild>
                                <Button
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                    onClick={applyFilters}
                                >
                                    Apply Filters
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
                {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden border-none shadow-md">
                        <CardContent className="p-4 w-full relative" onClick={() => showProductBottomSheetCallback!(product.id)}>
                            <div className="flex justify-end z-10">
                                <Button
                                    onClick={() => console.log('Liked!')}
                                    variant="ghost"
                                    size="icon"
                                    className="bg-white/80 hover:bg-white">
                                    <Heart className="" {...(product.isLiked ? { fill: "black" } : {})} />
                                </Button>

                            </div>
                            <img className="w-full h-32 bg-gray-200 rounded-lg mb-2 object-cover" src={product.imageUrl} />
                            <h3 className="font-semibold mb-1">{product.name}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-emerald-600 font-bold">${product.priceCOP / 1000000}M</span>
                                {
                                    product.notDiscountPriceCOP &&
                                    <span className="text-sm text-gray-500 line-through">${product.notDiscountPriceCOP / 1000000}M</span>
                                }

                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default CatalogPage;