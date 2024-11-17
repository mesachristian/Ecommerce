import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCube } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Product } from "@/models";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileProductSheetProps {
    productId: string | null;
}

const MobileProductSheet = ({ productId }: MobileProductSheetProps) => {

    const [productData, setProductData] = useState<Product | null>(null);

    const loadProductData = async () => {
        // TODO: Read data
        console.log(`Get data for ${productId}`);
        setProductData({
            id: 'p-1',
            name: 'Sony 50\" 4K',
            description: 'Nuevo, bonito y barato 🖥️💸💸',
            price: '$2M',
            isLiked: true,
            imagesUrls: [
                {
                    id: 'img-1',
                    url: 'https://m.media-amazon.com/images/I/71dRtTqxghL.jpg'
                },
                {
                    id: 'img-2',
                    url: 'https://i.blogs.es/3c4365/diseno/450_1000.jpg'
                },
                {
                    id: 'img-3',
                    url: 'https://m.media-amazon.com/images/I/71nP6lTogjL._AC_SL1500_.jpg'
                }
            ]
        });
    }

    useEffect(() => {
        loadProductData().catch(console.log);
    }, [productId]);

    if (productData == null) {
        return (
            <div className="flex justify-center items-center h-72">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    const handleLikeClick = () => {
        setProductData((prev) => {
            if (!prev) {
                return null;
            }
            return {
                ...prev,
                isLiked: !prev.isLiked
            };
        });
    }


    return (
        <div className="py-4 px-8 relative">
            <div className="absolute top-2 z-10 right-4">
                <Heart {...(productData.isLiked ? { fill: "black" } : {})} onClick={handleLikeClick} />
            </div>
            <Swiper
                className="z-0"
                modules={[EffectCube, Pagination]}
                pagination={{
                    bulletActiveClass: 'swiperjs-bullet-active',
                    bulletClass: 'swiperjs-bullet',
                    clickable: true
                }}
                effect={'cube'}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                spaceBetween={50}
                slidesPerView={1}>
                {
                    productData.imagesUrls.map((img) => {
                        return (
                            <SwiperSlide key={img.id}>
                                <img className="w-full object-cover rounded-lg" src={img.url} />
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>

            <h2 className="mt-12 text-2xl font-semibold">{productData.name}</h2>

            <p className="mt-1 text-lg">{productData.description}</p>

            <p className="mt-1 text-lg text-emerald-500 font-semibold">{productData.price}</p>

            <button className="mt-4 bg-emerald-700 text-white rounded-lg h-[50px] w-full outline-none border-0">
                <span className="text-lg">Agregar al carrito</span>
            </button>
        </div>
    );
}

export default MobileProductSheet;