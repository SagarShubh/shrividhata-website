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
    cf_product_image?: string; // Custom Field for Image (Version A)
    cf_image?: string; // Custom Field for Image (Version B - Likely default if name is 'Image')
    brand?: string;
    manufacturer?: string;
    cf_brand?: string;
    // Add other fields as necessary
}

/**
 * Exchanges Refresh Token for Access Token
 */
async function getAccessToken() {
    // Read directly from process.env at runtime to avoid module-scope caching issues
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

    if (cachedAccessToken && Date.now() < tokenExpiry) {
        return cachedAccessToken;
    }

    if (!clientId || !refreshToken || !clientSecret) {
        console.error('Zoho Credentials missing in environment (Runtime Check)');
        return null;
    }

    const url = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;

    try {
        // Cache token request for 55 mins (3300s) to align with Next.js static generation and avoid 'no-store' build error
        const res = await fetch(url, { method: 'POST', next: { revalidate: 3300 } });
        const data = await res.json();

        if (data.error) {
            console.error("Zoho Auth Error (getAccessToken):", data);
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
            // Override with Real Image if available
            // Priority 1: Custom Field (cf_product_image OR cf_image)
            const customImage = item.cf_product_image || item.cf_image;

            if (customImage) {
                if (customImage.startsWith('http')) {
                    image = customImage;
                } else {
                    // If it's not a URL, assume it acts like a flag or filename for the default image
                    image = `/api/images/zoho?itemId=${item.item_id}`;
                }
            }
            // Priority 2: Standard Image Name
            else if (item.image_name) {
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
                stock: item.stock_on_hand > 0,
                brand: item.cf_brand || item.brand || item.manufacturer || 'Generic'
            };
        });

        // If we found 0 items, maybe return static? Or just empty? 
        // If integration works but has 0 items, we return empty. 
        // If integration failed, we returned static above.

        // Debug Information:
        console.log(`Zoho fetched ${mappedProducts.length} items.`);

        // MERGE STRATEGY: 
        // If we found real items, return ONLY real items. 
        // Do not mix static demo data with real inventory to prevent Checkout ID errors.
        if (mappedProducts.length > 0) {
            return mappedProducts;
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
    // Ensure both are treated as strings for strict comparison
    const found = allProducts.find(p => String(p.id) === String(id));
    if (found) return found;

    // Fallback: Try fetching single item directly (in case it wasn't in the list or list is stale)
    try {
        const token = await getAccessToken();
        if (!token || !ZOHO_ORG_ID) return undefined;

        console.log(`Fallback: Fetching single item ${id} directly from Zoho...`);
        const res = await fetch(`https://www.zohoapis.in/books/v3/items/${id}?organization_id=${ZOHO_ORG_ID}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`
            },
            next: { revalidate: 0 } // Don't cache the fallback lookup
        });

        if (res.ok) {
            const data = await res.json();
            if (data.code === 0 && data.item) {
                const item = data.item as ZohoItem;
                // Map it manually
                let category: Category = 'Accessories';
                // (Simplified mapping - reusing the main logic would be better but keeping it self-contained here for safety)
                if (item.cf_category) {
                    if (['Cameras', 'Recorders', 'Storage', 'Accessories', 'Networking'].includes(item.cf_category)) {
                        category = item.cf_category as Category;
                    }
                }

                let subCategory: SubCategory = 'Connector';
                // Simple placeholder mapping or copy logic if needed.
                // For now, defaulting to generic to ensure display.

                // Use a valid default image from our public/products folder
                let image = '/products/dome-cam.jpg';

                // Override with Real Image if available
                // Priority 1: Custom Field (cf_product_image OR cf_image)
                const customImage = item.cf_product_image || item.cf_image;

                if (customImage) {
                    if (customImage.startsWith('http')) {
                        image = customImage;
                    } else {
                        // If it's not a URL, assume it acts like a flag or filename for the default image
                        image = `/api/images/zoho?itemId=${item.item_id}`;
                    }
                }
                // Priority 2: Standard Image Name
                else if (item.image_name) {
                    image = `/api/images/zoho?itemId=${item.item_id}`;
                }

                return {
                    id: String(item.item_id),
                    name: item.name,
                    description: item.description || '',
                    price: item.rate,
                    category,
                    subCategory, // Might be inaccurate without full logic, but better than 404
                    image,
                    stock: item.stock_on_hand > 0,
                    features: [], // Empty for now
                    brand: item.cf_brand || item.brand || item.manufacturer || 'Generic'
                };
            }
        }
    } catch (e) {
        console.error("Direct fetch failed:", e);
    }

    return undefined;
}

/**
 * Create a new item in Zoho Inventory
 */
export async function createZohoProduct(formData: FormData): Promise<{ success: boolean; error?: string }> {
    const token = await getAccessToken();

    // Detailed Debugging for Production
    if (!token) {
        console.error("Create Product Failed: Missing Access Token. Check Client ID/Secret/Refresh Token.");
        return { success: false, error: 'Auth Failed: No Access Token' };
    }
    if (!ZOHO_ORG_ID) {
        console.error("Create Product Failed: Missing Organization ID.");
        return { success: false, error: 'Auth Failed: Missing Org ID' };
    }

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
export async function getZohoItemImage(itemId: string): Promise<{ blob: Blob | null, type: string, error?: string }> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return { blob: null, type: '', error: 'Auth Failed: No Token/OrgID' };

    try {
        const res = await fetch(`https://www.zohoapis.in/books/v3/items/${itemId}/image?organization_id=${ZOHO_ORG_ID}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`
            },
            next: { revalidate: 0 } // NO CACHE for images to prevent stale 403s
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Zoho Image Fetch Failed: ${res.status} ${res.statusText}`, errorText);
            return { blob: null, type: '', error: `Fetch Failed: ${res.status} - ${errorText}` };
        }

        const blob = await res.blob();
        const type = res.headers.get('Content-Type') || 'image/jpeg';
        return { blob, type };
    } catch (e: any) {
        console.error("Zoho Image Fetch Error", e);
        return { blob: null, type: '', error: `Exception: ${e.message}` };
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

// --- Sales Order Tracking ---

export async function getSalesOrder(orderId: string) {
    const accessToken = await getAccessToken();

    try {
        // USE ZOHO BOOKS API (Consistent with createSalesOrder)
        const response = await fetch(`https://www.zohoapis.in/books/v3/salesorders/${orderId}?organization_id=${process.env.ZOHO_INVENTORY_ORG_ID}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`
            },
            next: { revalidate: 0 } // Always fresh
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Zoho API Error (Get Sales Order):', errorText);
            return null;
        }

        const data = await response.json();
        if (data.code === 0 && data.salesorder) {
            return {
                id: data.salesorder.salesorder_id,
                number: data.salesorder.salesorder_number,
                status: data.salesorder.status,
                date: data.salesorder.date,
                total: data.salesorder.total,
                customer_name: data.salesorder.customer_name,
                items: data.salesorder.line_items.map((item: any) => ({
                    name: item.name,
                    quantity: item.quantity,
                    rate: item.rate,
                    total: item.item_total
                })),
                shipment_details: data.salesorder.packages ? data.salesorder.packages : [] // Simplify for now
            };
        }
        return null;

    } catch (error) {
        console.error('Failed to get sales order:', error);
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


/**
 * Trigger the official Zoho Sales Order email (contains Payment Link)
 */
export async function emailSalesOrder(orderId: string, toEmail?: string): Promise<boolean> {
    const token = await getAccessToken();
    if (!token || !ZOHO_ORG_ID) return false;

    // Optional: Query parameters to specify recipients if needed, 
    // but usually calling this endpoint sends to the generated contacts.
    // To be safe and precise, we can pass expected recipients.
    const queryParams = toEmail ? `?to_mail_ids=${encodeURIComponent(toEmail)}` : '';

    try {
        const res = await fetch(`https://www.zohoapis.in/books/v3/salesorders/${orderId}/email${queryParams}&organization_id=${ZOHO_ORG_ID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`
            }
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('Zoho Email Trigger Failed:', err);
            return false;
        }

        return true;
    } catch (e) {
        console.error("Zoho Email Network Error:", e);
        return false;
    }
}
