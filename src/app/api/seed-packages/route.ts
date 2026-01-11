import { NextResponse } from 'next/server';
import { createZohoProduct, getZohoProducts } from '@/lib/zoho-inventory';

// Define the packages to seed
const PACKAGES_TO_SEED = [
    {
        name: "Home Basic Package",
        sku: "PKG-HOME-2",
        price: 12500,
        description: "Essential security for flats & apartments. 2x HD Cameras, DVR, 500GB HDD.",
        category: "Safety Equipment", // Default standard category
        subCategory: "Camera"
    },
    {
        name: "Home Standard Kit",
        sku: "PKG-HOME-4",
        price: 18500,
        description: "Complete coverage with 4x HD Night Vision Cameras, 1TB HDD, and Mobile View.",
        category: "Safety Equipment",
        subCategory: "Camera"
    },
    {
        name: "Shop Secure System",
        sku: "PKG-SHOP-4",
        price: 22000,
        description: "Retail security with Audio Recording capabilities for customer interactions. 4 Cameras.",
        category: "Safety Equipment",
        subCategory: "Camera"
    },
    {
        name: "Office Pro Setup",
        sku: "PKG-OFFICE-8",
        price: 42000,
        description: "Full premise monitoring for businesses. 8 Cameras, 2TB Storage, Central Monitoring.",
        category: "Safety Equipment",
        subCategory: "Camera"
    }
];

export async function GET() {
    try {
        const results = [];
        const existingProducts = await getZohoProducts();

        for (const pkg of PACKAGES_TO_SEED) {
            // Check if exists by SKU or Name
            const exists = existingProducts.find(p => p.name === pkg.name); // Using name as primary key for now

            if (exists) {
                results.push({ name: pkg.name, status: "Skipped (Already Exists)", id: exists.id });
                continue;
            }

            // Create Form Data
            const formData = new FormData();
            formData.append('name', pkg.name);
            formData.append('sku', pkg.sku);
            formData.append('price', pkg.price.toString());
            formData.append('description', pkg.description);
            formData.append('stock', '100'); // Default stock
            formData.append('category', pkg.category);
            formData.append('subCategory', pkg.subCategory);

            // Call create function
            const res = await createZohoProduct(formData);

            if (res.success) {
                results.push({ name: pkg.name, status: "Created", sku: pkg.sku });
            } else {
                results.push({ name: pkg.name, status: "Failed", error: res.error });
            }
        }

        return NextResponse.json({
            message: "Seeding process completed",
            results
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
