export default interface SectionProduct{
    id: string;
    name: string;
    imageUrl: string;
    priceCOP: number;
    notDiscountPriceCOP: number | null;
    isLiked: boolean;
}