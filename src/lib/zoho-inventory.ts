import { Product, products as staticProducts, Category, SubCategory } from '@/data/products';

const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
const ZOHO_ORG_ID = process.env.ZOHO_INVENTORY_ORG_ID;

// Cache access token
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
    // Add other fields as necessary
}

/**
 * Exchanges Refresh Token for Access Token
 */
async function getAccessToken() {
    if (cachedAccessToken && Date.now() < tokenExpiry) {
        return cachedAccessToken;
    }

    if (!ZOHO_CLIENT_ID || !ZOHO_REFRESH_TOKEN || !ZOHO_CLIENT_SECRET) {
        console.warn('Zoho Credentials missing in environment');
        return null; // Return null instead of throwing to avoid crashing
    }

    const url = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${ZOHO_REFRESH_TOKEN}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&grant_type=refresh_token`;

    try {
        const res = await fetch(url, { method: 'POST' });
        const data = await res.json();

        if (data.error) {
            console.error("Zoho Auth Error:", data.error);
            return null;
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
    // 1. Check for Credentials
    if (!ZOHO_REFRESH_TOKEN || !ZOHO_ORG_ID) {
        console.log("⚠️ No Zoho Credentials found. Using STATIC data.");
        return staticProducts;
    }

    try {
        // 2. Authenticate
        const token = await getAccessToken();
        if (!token) return staticProducts;

        // 3. Fetch Items
        // We filter by status=active
        // SWITCH TO ZOHO BOOKS API
        const res = await fetch(`https://books.zoho.in/api/v3/items?organization_id=${ZOHO_ORG_ID}&status=active`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
            },
            next: { revalidate: 60 } // Cache for 1 minute for fresher data
        });

        if (!res.ok) {
            console.warn("Zoho API Error:", await res.text());
            return staticProducts;
        }

        const data = await res.json();

        if (!data.items) {
            console.warn("Zoho API returned no items info:", data);
            return staticProducts;
        }

        const items: ZohoItem[] = data.items;

        // 4. Map to Product Schema
        const mappedProducts = items.map(item => {
            // Helper to safe-cast category, defaulting to 'Accessories' if robust match fails
            let category: Category = 'Accessories';
            if (item.cf_category) {
                // Try to match somewhat permissively (case insensitive?)
                // For now, strict match assuming user inputs it correctly in Zoho
                // But we should cast carefully
                if (['Cameras', 'Recorders', 'Storage', 'Accessories', 'Networking'].includes(item.cf_category)) {
                    category = item.cf_category as Category;
                }
            }

            const subCategory = (item.cf_subcategory as SubCategory) || 'Connector';

            // Placeholder for image. 
            // TODO: If Zoho public portal is enabled, we could construct URL:
            // https://inventory.zoho.com/api/v1/items/{item_id}/image?organization_id={org_id} (Requires auth usually)
            // For now, use a generic placeholder or keep static image if we can match ID? 
            // Ideally we want to see the image.
            let image = '/placeholder.jpg';
            if (category === 'Cameras') image = '/products/dome-cam.jpg'; // Just a better default
            if (item.image_name) {
                // If we had a way to serve it, we would.
            }

            return {
                id: item.item_id,
                name: item.name,
                description: item.description || '',
                price: item.rate,
                category: category,
                subCategory: subCategory,
                image: image,
                features: [], // Zoho description might contain features, could parse lines?
                stock: item.stock_on_hand > 0
            };
        });

        // If we found 0 items, maybe return static? Or just empty? 
        // If integration works but has 0 items, we return empty. 
        // If integration failed, we returned static above.
        return mappedProducts.length > 0 ? mappedProducts : staticProducts;

    } catch (error) {
        console.error("Failed to fetch products from Zoho:", error);
        return staticProducts; // Graceful fallback
    }
}

export async function getZohoProduct(id: string): Promise<Product | undefined> {
    const allProducts = await getZohoProducts();
    // In efficient real-world, we would fetch single item from API:
    // GET https://inventory.zoho.in/api/v1/items/${id}
    // But since we have a small shop, fetching all is fine for now and easier for caching.
    return allProducts.find(p => p.id === id);
}
