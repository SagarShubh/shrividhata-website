import { getZohoProducts } from '@/lib/zoho-inventory';

async function main() {
    console.log('--- Debugging Zoho Products Fetch ---');
    try {
        const products = await getZohoProducts();
        console.log(`Fetched ${products.length} products.`);
        if (products.length > 0) {
            console.log('First Product:', products[0].name);
            const isStatic = products[0].id.length < 5; // Heuristic: Static IDs are usually '1', '2' etc. Zoho IDs are long.
            console.log('Is Static Data?', isStatic);
        }
    } catch (e) {
        console.error('Error fetching products:', e);
    }
}

main();
