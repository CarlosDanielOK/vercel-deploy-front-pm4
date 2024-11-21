import { IProduct } from '../interfaces/types';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

// Obtiene todos los productos
export const getProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await fetch(`${APIURL}/products`);
        return await response.json();
    } catch (error) {
        throw new Error(`Ocurrió un error al obtener los productos en getProducts: ${error}`);
    }
}

// Obtiene un producto por su id
export const getProductById = async (id: string): Promise<IProduct> => {
    try {
        const response: IProduct[] = await getProducts();
        const producto = response.find((product) => product.id === parseInt(id));
        if (!producto) {
            throw new Error(`Producto con id ${id} no encontrado`);
        }
        return producto;
    } catch (error) {
        throw new Error(`Ocurrió un error al obtener el producto en getProductById: ${error}`);
    }
}