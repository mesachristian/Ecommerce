import { CategoryMiniature, HomeSection } from "@/models";

export const getCategories = async (): Promise<CategoryMiniature[]> => {
    let fakeCategories: CategoryMiniature[] = [
        {
            id: 'c-1',
            label: 'Celulares',
            imageUrl: 'https://as-images.apple.com/is/MHLM3_AV08?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1618534326000'
        },
        {
            id: 'c-2',
            label: 'Telefonos',
            imageUrl: 'https://media.direct.playstation.com/is/image/sierialto/PS5PRO-Hero-1'
        },
        {
            id: 'c-3',
            label: 'Laptops',
            imageUrl: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW1geGv?ver=e834&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true'
        },
        {
            id: 'c-4',
            label: 'Cámaras',
            imageUrl: 'https://www.ukal-elevage.com/media/catalog/product/cache/7355c03e5731ca893c9850bf35827667/h/o/hor100124-camera-zoom-pro-horizont.jpg'
        },
        {
            id: 'c-5',
            label: 'Tabletas',
            imageUrl: 'https://i5.walmartimages.com.mx/mg/gm/1p/images/product-images/img_large/00019680475082l.jpg'
        },
        {
            id: 'c-6',
            label: 'Hogar Inteligente',
            imageUrl: 'https://www.pert.me/wp-content/uploads/2023/04/The-Evolution-of-Smart-Homes-copy.jpg'
        },
        {
            id: 'c-7',
            label: 'Wearables',
            imageUrl: 'https://wearables.com/cdn/shop/products/Sony_20-_20SmartWatch_203_20Black_20-_201_480x480.jpg?v=1505837347'
        },
        {
            id: 'c-8',
            label: 'Audio',
            imageUrl: 'https://cdnx.jumpseller.com/tienda-gamer-medellin/image/35956913/resize/610/610?1685657260'
        }
    ];

    await (new Promise(resolve => setTimeout(resolve, 500)));

    return fakeCategories;
}

export const getHomeSections = async (): Promise<HomeSection[]> => {
    let sections: HomeSection[] = [
        {
            id: "s-1",
            sectionName: "Flashsale",
            products: [
                {
                    id: "p-12",
                    name: "Sony 50\" 4K",
                    imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
                    priceCOP: 1800000,
                    notDiscountPriceCOP: 2200000,
                    isLiked: true
                },
                {
                    id: "p-2",
                    name: "iPhone 14",
                    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s",
                    priceCOP: 4000000,
                    notDiscountPriceCOP: 4500000,
                    isLiked: false
                },
                {
                    id: "p-9",
                    name: "MacBook Air M2",
                    imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
                    priceCOP: 5000000,
                    notDiscountPriceCOP: null,
                    isLiked: true
                }
            ]
        },
        {
            id: "s-2",
            sectionName: "Celulares",
            products: [
                {
                    id: "p-1",
                    name: "Samsung Galaxy S23",
                    imageUrl: "https://images.samsung.com/co/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-common-introduction-banner.jpg?imbypass=true",
                    priceCOP: 3000000,
                    notDiscountPriceCOP: null,
                    isLiked: true
                },
                {
                    id: "p-2",
                    name: "iPhone 14",
                    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlvX7PDOzhBzDV0W1j25y0SVLjRaOp7J44Q&s",
                    priceCOP: 4000000,
                    notDiscountPriceCOP: 4500000,
                    isLiked: false
                },
                {
                    id: "p-3",
                    name: "Motorola Edge 40",
                    imageUrl: "https://i.blogs.es/45176e/motorola-edge-40-1/650_1200.jpeg",
                    priceCOP: 1500000,
                    notDiscountPriceCOP: null,
                    isLiked: true
                }
            ]
        },
        {
            id: "s-3",
            sectionName: "Computadores",
            products: [
                {
                    id: "p-7",
                    name: "Laptop Dell Inspiron",
                    imageUrl: "https://m.media-amazon.com/images/I/71nP6lTogjL._AC_SL1500_.jpg",
                    priceCOP: 2500000,
                    notDiscountPriceCOP: null,
                    isLiked: true
                },
                {
                    id: "p-8",
                    name: "HP Pavilion x360",
                    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNLBUmz4x3MEA_E2ziHYOJatPwHBMrskZAnQ&s",
                    priceCOP: 2200000,
                    notDiscountPriceCOP: null,
                    isLiked: false
                },
                {
                    id: "p-9",
                    name: "MacBook Air M2",
                    imageUrl: "https://i.blogs.es/3c4365/diseno/450_1000.jpg",
                    priceCOP: 5000000,
                    notDiscountPriceCOP: null,
                    isLiked: true
                }
            ]
        },
        {
            id: "s-4",
            sectionName: "Televisores",
            products: [
                {
                    id: "p-10",
                    name: "Samsung 55\" 4K UHD",
                    imageUrl: "https://team8.se/wp-content/uploads/2022/06/809dd429-c812-41db-a1b6-ef43b27a866d.jpg",
                    priceCOP: 2000000,
                    notDiscountPriceCOP: 2500000,
                    isLiked: false
                },
                {
                    id: "p-11",
                    name: "LG 65\" OLED",
                    imageUrl: "https://www.lg.com/content/dam/channel/wcms/co/images/televisores/oled65c3psa_awc_escb_co_c/gallery/DZ-9.jpg",
                    priceCOP: 4500000,
                    notDiscountPriceCOP: 5000000,
                    isLiked: true
                },
                {
                    id: "p-12",
                    name: "Sony 50\" 4K",
                    imageUrl: "https://m.media-amazon.com/images/I/71dRtTqxghL.jpg",
                    priceCOP: 1800000,
                    notDiscountPriceCOP: 2200000,
                    isLiked: true
                }
            ]
        }
    ];

    await (new Promise(resolve => setTimeout(resolve, 500)));

    return sections;
}