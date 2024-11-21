import { FavoriteProduct } from "@/models";

export interface IFavoritesService{

    getFavorites(): Promise<FavoriteProduct[]>; 

    removeFromFavorites(productId: string): Promise<void>;

    addProductToCart(productId: string): Promise<void>;

}