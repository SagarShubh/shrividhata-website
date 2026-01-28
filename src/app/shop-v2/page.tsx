import { getZohoProducts } from '@/lib/zoho-inventory';
import ShopClientV2 from '@/components/shop/ShopClientV2';

export const metadata = {
    title: 'Shop V2 (Hidden) | ShriVidhata',
    robots: 'noindex, nofollow' // Ensure search engines don't index this test page
};

export default async function ShopV2Page() {
    const products = await getZohoProducts();

    return <ShopClientV2 initialProducts={products} />;
}
