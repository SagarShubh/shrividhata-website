import { getZohoProducts } from '@/lib/zoho-inventory';
import ShopClientV2 from '@/components/shop/ShopClientV2';

export default async function ShopPage() {
    const products = await getZohoProducts();

    return <ShopClientV2 initialProducts={products} />;
}
