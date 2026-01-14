import { MetadataRoute } from 'next';
import { getZohoProducts } from '@/lib/zoho-inventory';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://shrividhata.com';

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/services',
        '/shop',
        '/contact',
        '/process',
        '/amc',
        '/refund-policy',
        '/shipping-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Product Routes
    const products = await getZohoProducts();
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/shop/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    return [...staticRoutes, ...productRoutes];
}
