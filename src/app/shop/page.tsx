import { getZohoProducts } from '@/lib/zoho-inventory';
import ShopClient from '@/components/shop/ShopClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Shop CCTV Cameras & Security Systems Online | ShriVidhata",
    description: "Buy Hikvision, CP Plus, and Dahua CCTV cameras, DVRs, NVRs, and accessories online. Best prices in Madhya Pradesh with installation support.",
    alternates: {
        canonical: 'https://shrividhata.com/shop',
    }
};

export default async function ShopPage() {
    const products = await getZohoProducts();

    return <ShopClient initialProducts={products} />;
}
