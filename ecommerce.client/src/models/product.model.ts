export default interface Product{
    id: string;
    name: string;
    description: string;
    category: string;
    priceCOP: number;
    previousPriceCOP: number | null | undefined;
    isLiked: boolean;
    imagesUrls: string[];
}