import { getZohoProduct } from '@/lib/zoho-inventory';
import Link from 'next/link';
import ProductDetailsClient from '@/components/shop/ProductDetailsClient';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
    const { id } = await params;
    const product = await getZohoProduct(id);

    if (!product) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link href="/shop" className="text-blue-600 hover:underline">
                    Back to Shop
                </Link>
            </div>
        );
    }

    return <ProductDetailsClient product={product} />;
}
