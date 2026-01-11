import { getZohoProduct } from '@/lib/zoho-inventory';
import Link from 'next/link';
import ProductDetailsClient from '@/components/shop/ProductDetailsClient';

interface Props {
    params: Promise<{ id: string }>;
}

import { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getZohoProduct(id);

    if (!product) {
        return {
            title: 'Product Not Found | ShriVidhata',
            description: 'The requested product could not be found.',
        };
    }

    return {
        title: `${product.name} | ShriVidhata Security Shop`,
        description: product.description.substring(0, 160), // Truncate for SEO
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image.startsWith('/') ? `https://shrividhata.com${product.image}` : product.image],
        },
    };
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

    // JSON-LD Structured Data for Google Shopping
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image.startsWith('/') ? `https://shrividhata.com${product.image}` : product.image,
        description: product.description,
        sku: product.id, // Assuming ID is SKU-like
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: product.price,
            availability: product.stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `https://shrividhata.com/shop/${product.id}`,
            seller: {
                '@type': 'Organization',
                name: 'ShriVidhata Creations Services',
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailsClient product={product} />
        </>
    );
}
