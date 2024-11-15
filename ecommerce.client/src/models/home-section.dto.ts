import SectionProduct from "./section-product.dto";

export default interface HomeSection{
    id: string;
    sectionName: string;
    products: SectionProduct[];
}