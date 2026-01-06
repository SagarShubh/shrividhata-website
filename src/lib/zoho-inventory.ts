import { Product, products as staticProducts, Category, SubCategory } from '@/data/products';

const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
const ZOHO_ORG_ID = process.env.ZOHO_INVENTORY_ORG_ID;

// Cache the access token briefly in memory (simple solution for serverless)
let cachedAccessToken: string | null = null;
let tokenExpiry = 0;

interface ZohoItem {
    item_id: string;
    name: string;
    description: string;
    rate: number;
    image_name: string;
    image_document_id?: string;
    sku: string;
    status: string;
    stock_on_hand: number;
    cf_category?: string; // Custom Field for Category
    cf_subcategory?: string; // Custom Field for SubCategory
}

/**
 * Exchanges Refresh Token for Access Token
 */
async function getAccessToken() {
    if (cachedAccessToken && Date.now() < tokenExpiry) {
        return cachedAccessToken;
    }

    if (!ZOHO_CLIENT_ID || !ZOHO_REFRESH_TOKEN || !ZOHO_CLIENT_SECRET) {
        throw new Error('Missing Zoho Credentials');
    }

    const url = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${ZOHO_REFRESH_TOKEN}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&grant_type=refresh_token`;

    try {
        const res = await fetch(url, { method: 'POST' });
        const data = await res.json();

        if (data.error) {
            console.error("Zoho Auth Error:", data.error);
            throw new Error(data.error);
        }

        cachedAccessToken = data.access_token;
        // Zoho tokens last 60 mins. Set expiry to 55 mins to be safe.
        tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

        return cachedAccessToken;
    } catch (error) {
        console.error('Failed to get Zoho Access Token:', error);
        return null;
    }
}

/**
 * Fetch all items from Zoho Inventory
 */
export async function getZohoProducts(): Promise<Product[]> {
    // FALLBACK: If no credentials, return static data
    if (!ZOHO_REFRESH_TOKEN) {
        console.log("⚠️ No Zoho Credentials found in .env. Using STATIC data.");
        return staticProducts;
    }

    try {
        const token = await getAccessToken();
        if (!token || !ZOHO_ORG_ID) return staticProducts;

        const res = await fetch(`https://inventory.zoho.in/api/v1/items?organization_id=${ZOHO_ORG_ID}&status=active`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            console.error("Zoho API Error:", await res.text());
            return staticProducts;
        }

        const data = await res.json();
        const items: ZohoItem[] = data.items;

        // Map Zoho Item to our Product Schema
        return items.map(item => {
            // Safe mapping for categories if Custom Fields fields aren't set up yet
            const category = (item.cf_category as Category) || 'Accessories';
            const subCategory = (item.cf_subcategory as SubCategory) || 'Connector';

            // Image URL construction (Requires public image enabled in Zoho or a proxy)
            // For now, we use a placeholder if no image_name, or try to construct it 
            // Note: Real Zoho Image fetching is tricky, usually requires an API proxy. 
            // We actally might stick to static images for demo unless they are public URLs.
            let image = '/placeholder.jpg';

            return {
                id: item.item_id,
                name: item.name,
                description: item.description || '',
                price: item.rate,
                category: category,
                subCategory: subCategory,
                image: image,
                features: [], // Zoho doesn't have a features array by default, unless passed in Description
                stock: item.stock_on_hand > 0
            };
        });

    } catch (error) {
        console.error("Failed to fetch products from Zoho:", error);
        return staticProducts; // Graceful fallback
    }
}

export async function getZohoProduct(id: string): Promise<Product | undefined> {
    const allProducts = await getZohoProducts();
    return allProducts.find(p => p.id === id);
}
