import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/', '/context/', '/lib/'],
        },
        sitemap: 'https://shrividhata.com/sitemap.xml',
    };
}
