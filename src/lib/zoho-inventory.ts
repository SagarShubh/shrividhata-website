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
        // SWITCH TO ZOHO BOOKS API on .in data center
        const res = await fetch(`https://www.zohoapis.in/books/v3/items?organization_id=${ZOHO_ORG_ID}&status=active`, {
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
            // Helper to safe-cast category
            let category: Category = 'Accessories';

            // 1. Try Custom Field first (case insensitive)
            if (item.cf_category) {
                const cf = item.cf_category.toLowerCase();
                if (cf.includes('camera')) category = 'Cameras';
                else if (cf.includes('record') || cf.includes('nvr') || cf.includes('dvr')) category = 'Recorders';
                else if (cf.includes('storage') || cf.includes('drive') || cf.includes('hdd')) category = 'Storage';
                else if (cf.includes('network') || cf.includes('switch') || cf.includes('router')) category = 'Networking';
                else if (cf.includes('cable') || cf.includes('connector')) category = 'Accessories';
            }
            // 2. Fallback to Name Analysis if CF is missing/empty
            else {
                const name = item.name.toLowerCase();
                if (name.includes('camera') || name.includes('dome') || name.includes('bullet') || name.includes('ptz')) category = 'Cameras';
                else if (name.includes('nvr') || name.includes('dvr')) category = 'Recorders';
                else if (name.includes('hdd') || name.includes('wd') || name.includes('seagate')) category = 'Storage';
                else if (name.includes('switch') || name.includes('router') || name.includes('cable') || name.includes('cat6')) category = 'Networking';
                else category = 'Accessories'; // Default
            }

            // SubCategory Logic
            let subCategory: SubCategory = (item.cf_subcategory as SubCategory);

            if (!subCategory) {
                const name = item.name.toLowerCase();
                if (category === 'Cameras') {
                    if (name.includes('dome')) subCategory = 'Dome Camera';
                    else if (name.includes('bullet')) subCategory = 'Bullet Camera';
                    else if (name.includes('ptz')) subCategory = 'PTZ Camera';
                    else if (name.includes('wifi')) subCategory = 'WiFi Camera';
                    else subCategory = 'Dome Camera';
                } else if (category === 'Recorders') {
                    if (name.includes('nvr')) subCategory = 'NVR';
                    else if (name.includes('dvr')) subCategory = 'DVR';
                    else subCategory = 'NVR';
                } else if (category === 'Storage') {
                    subCategory = 'Hard Drive';
                } else if (category === 'Networking') {
                    if (name.includes('switch')) subCategory = 'Switch';
                    else if (name.includes('router')) subCategory = 'Router';
                    else subCategory = 'Cable';
                } else {
                    if (name.includes('power')) subCategory = 'Power Supply';
                    else if (name.includes('cable')) subCategory = 'Cable';
                    else subCategory = 'Connector';
                }
            }

            // 3. Image Handling
            // Default to a valid existing image based on category to avoid 404s
            let image = '/products/connectors.jpg';
            if (category === 'Cameras') image = '/products/dome-cam.jpg';
            if (category === 'Recorders') image = '/products/nvr-16ch.jpg';
            if (category === 'Storage') image = '/products/hdd-1tb.jpg';
            if (category === 'Networking') image = '/products/cat6-cable.jpg';

            // Override with Real Image if available
            if (item.image_name) {
                image = `/api/images/zoho?itemId=${item.item_id}`;
            } else {
                // Secondary check: Refine default images based on subCategory for better generic look
                if (subCategory === 'Bullet Camera') image = '/products/bullet-cam.jpg';
                if (subCategory === 'PTZ Camera') image = '/products/ptz-cam.jpg';
                if (subCategory === 'DVR') image = '/products/dvr-8ch.jpg';
                if (subCategory === 'Hard Drive') image = '/products/hdd-1tb.jpg';
                if (subCategory === 'Cable') image = '/products/cat6-cable.jpg';
            }

            return {
                id: String(item.item_id),
                name: item.name,
                description: item.description || '',
                price: item.rate,
                category: category,
                subCategory: subCategory,
                image: image,
                features: [],
                stock: item.stock_on_hand > 0
            };
        });

        // If we found 0 items, maybe return static? Or just empty? 
        // If integration works but has 0 items, we return empty. 
        // If integration failed, we returned static above.

        // Debug Information:
        console.log(`Zoho fetched ${mappedProducts.length} items.`);

        // MERGE STRATEGY: 
        // Return Zoho products. If Zoho has < 4 products (maybe just testing?), 
        // append static products so the shop doesn't look empty.
        // This is safer for production until you have full inventory loaded.

        if (mappedProducts.length > 0) {
            // Filter out static products that might have same ID as Zoho ones to avoid dupes?
            // (Unlikely since Zoho IDs are numbers, our static IDs are strings 'cam-001')
            return [...mappedProducts, ...staticProducts];
        }

        return staticProducts;

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
    // Ensure both are treated as strings for strict comparison
    return allProducts.find(p => String(p.id) === String(id));
}

/**
 * Create a new item in Zoho Inventory
 */
export async function createZohoProduct(formData: FormData): Promise<{ success: boolean; error?: string }> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return { success: false, error: 'Authentication failed' };

    const name = formData.get('name') as string;
    const rate = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const quantity = parseInt(formData.get('stock') as string);
    const category = formData.get('category') as string;
    const subCategory = formData.get('subCategory') as string;
    const sku = formData.get('sku') as string;

    // 1. Create Item JSON
    const itemData = {
        name,
        rate,
        description,
        sku,
        item_type: 'sales', // or 'inventory' if you track inventory
        status: 'active',
        initial_stock: quantity, // Only works for inventory items usually, simplified here
        initial_stock_rate: rate,
        cf_category: category,
        cf_subcategory: subCategory
        // unit: 'box', // Default unit?
    };

    try {
        const res = await fetch(`https://www.zohoapis.in/books/v3/items?organization_id=${ZOHO_ORG_ID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });

        const data = await res.json();

        if (data.code !== 0) {
            console.error('Zoho Create Error:', data);
            return { success: false, error: data.message };
        }

        const itemId = data.item.item_id;

        // 2. Upload Image if present
        const imageFile = formData.get('image') as File;
        if (imageFile && imageFile.size > 0) {
            await uploadZohoImage(itemId, imageFile);
        }

        return { success: true };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'Network error' };
    }
}

/**
 * Update an existing item
 */
export async function updateZohoProduct(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return { success: false, error: 'Authentication failed' };

    const name = formData.get('name') as string;
    const rate = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const subCategory = formData.get('subCategory') as string;
    const sku = formData.get('sku') as string;

    const itemData = {
        name,
        rate,
        description,
        sku,
        cf_category: category,
        cf_subcategory: subCategory
    };

    try {
        const res = await fetch(`https://www.zohoapis.in/books/v3/items/${id}?organization_id=${ZOHO_ORG_ID}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });

        const data = await res.json();

        if (data.code !== 0) {
            return { success: false, error: data.message };
        }

        // 2. Upload/Replace Image if present
        const imageFile = formData.get('image') as File;
        if (imageFile && imageFile.size > 0) {
            await uploadZohoImage(id, imageFile);
        }

        return { success: true };
    } catch (e) {
        return { success: false, error: 'Network error' };
    }
}

/**
 * Delete an item
 */
export async function deleteZohoProduct(id: string): Promise<{ success: boolean; error?: string }> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return { success: false, error: 'Authentication failed' };

    try {
        const res = await fetch(`https://www.zohoapis.in/books/v3/items/${id}?organization_id=${ZOHO_ORG_ID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`
            }
        });
        const data = await res.json();
        if (data.code !== 0) return { success: false, error: data.message };

        return { success: true };
    } catch (error) {
        return { success: false, error: 'Network error' };
    }
}


/**
 * Upload Image to Zoho Item
 */
export async function uploadZohoImage(itemId: string, file: File): Promise<boolean> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return false;

    const formData = new FormData();
    formData.append('image', file);
    // Sometimes Zoho expects 'image' or 'document'

    try {
        // Correct endpoint for uploading item image
        const res = await fetch(`https://www.zohoapis.in/books/v3/items/${itemId}/image?organization_id=${ZOHO_ORG_ID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                // Do NOT set Content-Type here, let fetch set it with boundary for FormData
            },
            body: formData
        });

        const data = await res.json();
        return data.code === 0;
    } catch (e) {
        console.error("Image upload failed", e);
        return false;
    }
}

/**
 * Fetch Item Image Blob
 */
export async function getZohoItemImage(itemId: string): Promise<{ blob: Blob | null, type: string }> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return { blob: null, type: '' };

    try {
        const res = await fetch(`https://www.zohoapis.in/books/v3/items/${itemId}/image?organization_id=${ZOHO_ORG_ID}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`
            },
            next: { revalidate: 3600 } // Cache image for 1 hour
        });

        if (!res.ok) return { blob: null, type: '' };

        const blob = await res.blob();
        const type = res.headers.get('Content-Type') || 'image/jpeg';
        return { blob, type };
    } catch (e) {
        console.error("Zoho Image Fetch Error", e);
        return { blob: null, type: '' };
    }
}

// --- Sales Order & Contact Logic ---

export interface CreateSalesOrderData {
    customer_id: string;
    items: {
        item_id: string;
        quantity: number;
        rate?: number; // Optional override
    }[];
    notes?: string;
}

export interface CustomerData {
    contact_name: string;
    company_name?: string;
    email: string;
    phone?: string;
    billing_address?: {
        address: string;
        city: string;
        zip: string;
        state?: string;
        country?: string;
    };
    shipping_address?: {
        address: string;
        city: string;
        zip: string;
        state?: string;
        country?: string;
    };
}

/**
 * Find a contact by email or create a new one
 */
export async function findOrCreateContact(customer: CustomerData): Promise<string | null> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return null;

    try {
        // 1. Search for Contact
        const searchUrl = `https://www.zohoapis.in/books/v3/contacts?organization_id=${ZOHO_ORG_ID}&email=${encodeURIComponent(customer.email)}`;
        const searchRes = await fetch(searchUrl, {
            headers: { 'Authorization': `Zoho-oauthtoken ${token}` }
        });
        const searchData = await searchRes.json();

        if (searchData.code === 0 && searchData.contacts && searchData.contacts.length > 0) {
            return searchData.contacts[0].contact_id;
        }

        // 2. Create if not found
        const createUrl = `https://www.zohoapis.in/books/v3/contacts?organization_id=${ZOHO_ORG_ID}`;

        const payload = {
            contact_name: customer.contact_name,
            company_name: customer.company_name || customer.contact_name,
            contact_persons: [{
                first_name: customer.contact_name.split(' ')[0],
                last_name: customer.contact_name.split(' ').slice(1).join(' ') || '.',
                email: customer.email,
                phone: customer.phone,
                is_primary_contact: true
            }],
            billing_address: customer.billing_address || {},
            shipping_address: customer.shipping_address || {}
        };

        const createRes = await fetch(createUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const createData = await createRes.json();

        if (createData.code === 0) {
            return createData.contact.contact_id;
        } else {
            console.error("Zoho Create Contact Error:", createData);
            return null;
        }

    } catch (e) {
        console.error("Zoho Contact Error:", e);
        return null;
    }
}

/**
 * Create a Sales Order
 */
export async function createSalesOrder(orderData: CreateSalesOrderData): Promise<{ success: boolean; order_id?: string; error?: string }> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return { success: false, error: 'Authentication failed' };

    const payload = {
        customer_id: orderData.customer_id,
        line_items: orderData.items.map(item => ({
            item_id: item.item_id,
            quantity: item.quantity,
            rate: item.rate // If undefined, Zoho uses item default rate
        })),
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        notes: orderData.notes,
        is_inclusive_tax: false // Adjust based on your tax settings
    };

    try {
        const res = await fetch(`https://www.zohoapis.in/books/v3/salesorders?organization_id=${ZOHO_ORG_ID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (data.code === 0) {
            return { success: true, order_id: data.salesorder.salesorder_id };
        } else {
            return { success: false, error: data.message };
        }
    } catch (e) {
        console.error("Create Sales Order Error:", e);
        return { success: false, error: "Network Error" };
    }
}

