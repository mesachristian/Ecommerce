import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryMiniature, HomeSection, SectionProduct } from "@/models"
import { Heart } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { BottomSheetContext } from "@/context/bottom-sheet.context";
import { useServices } from '@/context/service.context';

const HomePage = () => {

    const [categories, setCategories] = useState<CategoryMiniature[] | null>(null);
    const [sections, setSections] = useState<HomeSection[] | null>(null);

    const { showProductBottomSheetCallback } = useContext(BottomSheetContext);
    const { homeService } = useServices();


    const loadInitData = async () => {
        const [resCategories, resSections] = await Promise.all([
            homeService.getCategories(),
            homeService.getHomeSections()
        ]);

        setCategories(resCategories);
        setSections(resSections);
    }

    useEffect(() => {
        loadInitData().catch(console.log)
    }, []);

    return (
        <div className="p-4">
            <Card className="mb-6 bg-emerald-50 border-emerald-200">
                <CardContent className="p-4">
                    <p className="text-emerald-700">Delivery is <span className="font-bold">50% cheaper</span> today! 🚚💨</p>
                </CardContent>
            </Card>

            {
                categories &&
                <section className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold md:text-2xl md:my-4">Categories</h2>
                        <Button variant="link" className="text-emerald-600">See all</Button>
                    </div>
                    <div className="flex space-x-4 md:space-x-10 pb-2 overflow-x-auto scrollbar-hide">
                        {categories.map((category) => (
                            <div key={category.id} className="flex flex-col items-center flex-shrink-0">
                                <img className="w-16 h-16 md:w-36 md:h-36 bg-gray-200 rounded-full mb-2 object-cover md:hover:scale-105" src={category.imageUrl} />
                                <span className="text-xs text-center whitespace-nowrap md:text-sm">{category.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            }

            {
                sections &&
                sections.map((section) => {
                    return (
                        <section key={section.id} className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold md:text-2xl md:my-4">{section.sectionName}</h2>
                                <div className="flex items-center space-x-2">
                                    {
                                        section.sectionName == "Flashsale" &&
                                        <span className="text-red-500 font-semibold">02:59:23</span>
                                    }
                                    <Button variant="link" className="text-emerald-600">See all</Button>
                                </div>
                            </div>

                            <div className="flex pb-2 overflow-x-auto scrollbar-hide">
                                {section.products.map((product) => (
                                    <HomeProductCard
                                        product={product}
                                        showProductBottomSheetCallback={(id) => showProductBottomSheetCallback!(id)}
                                        addToCart={() => { }}
                                        showProductPage={() => { }} />
                                ))}
                            </div>
                        </section>
                    );
                })
            }



        </div>
    )
}

interface HomeProductCardProps {
    product: SectionProduct;
    showProductBottomSheetCallback: (id: string) => void;
    addToCart: (id: string) => void;
    showProductPage: (id: string) => void;
}

const HomeProductCard = ({ product, showProductBottomSheetCallback, addToCart, showProductPage }: HomeProductCardProps) => {
    return (
        <Card key={product.name} className="w-[220px] mr-2 flex-shrink-0">
            <CardContent className="p-4 w-full relative" onClick={() => showProductBottomSheetCallback!(product.id)}>
                <div className="flex justify-end">
                    <Button
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

                <div className="hidden md:block">
                    <Button
                        className="flex-1 bg-emerald-600 w-full my-4 hover:border-2 hover:border-emerald-600 hover:text-emerald-600 hover:bg-white"
                        onClick={() => { }}
                    >
                        Agregar al carrito
                    </Button>

                    <Button
                        className="flex-1 w-full border-2 border-emerald-600 text-emerald-600 bg-white hover:bg-white"
                        onClick={() => { }}
                    >
                        Ver el producto
                    </Button>
                </div>

                <div>

                </div>
            </CardContent>
        </Card>
    );
}

export default HomePage;