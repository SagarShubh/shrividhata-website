import { getZohoProducts } from '@/lib/zoho-inventory';
import { Category } from '@/data/products';
import ShopClient from '@/components/shop/ShopClient';

export default async function ShopPage() {
    const products = await getZohoProducts();

    return <ShopClient initialProducts={products} />;
}
