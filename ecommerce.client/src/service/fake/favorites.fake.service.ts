import { FavoriteProduct, Product } from "@/models";
import { IFavoritesService } from "../favorites.service";

const PRODUCTS_LOCAL_STORAGE_KEY = "products-key";
const DELAY_MS = 500;

export class FavoritesServiceFakeImpl implements IFavoritesService {

    async getFavorites(): Promise<FavoriteProduct[]> {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        let productsString = localStorage.getItem(PRODUCTS_LOCAL_STORAGE_KEY);
        let products = productsString ? JSON.parse(productsString) as Product[] : [];
        return products.filter(p => p.isLiked).map(p => {
            var favProduct: FavoriteProduct = {
                id : p.id,
                name: p.name,
                imageUrl: p.imagesUrls[0],
                priceCOP: p.priceCOP
            }
            return favProduct;
        });
    }

    removeFromFavorites(productId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    addProductToCart(productId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}