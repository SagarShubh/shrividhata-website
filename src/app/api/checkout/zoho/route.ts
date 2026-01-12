import { NextResponse } from 'next/server';
import { createSalesOrder, findOrCreateContact, CustomerData } from '@/lib/zoho-inventory';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { product, quantity = 1, shippingDetails } = body;

        if (!product || !shippingDetails) {
            return NextResponse.json(
                { error: 'Missing product or shipping details' },
                { status: 400 }
            );
        }

        // 1. Prepare Customer Data
        const customerData: CustomerData = {
            contact_name: shippingDetails.name,
            email: shippingDetails.email,
            phone: shippingDetails.phone,
            billing_address: {
                address: shippingDetails.address,
                city: shippingDetails.city,
                zip: shippingDetails.pincode,
                country: 'India',
                state: '' // Add state if you collect it
            },
            shipping_address: {
                address: shippingDetails.address,
                city: shippingDetails.city,
                zip: shippingDetails.pincode,
                country: 'India',
                state: ''
            }
        };

        // 2. Find or Create Customer
        console.log("Searching/Creating Customer...");
        const customerId = await findOrCreateContact(customerData);

        if (!customerId) {
            return NextResponse.json(
                { error: 'Failed to create or find customer in Zoho' },
                { status: 500 }
            );
        }

        // 3. Create Sales Order
        console.log("Creating Sales Order for Customer:", customerId);
        const orderResult = await createSalesOrder({
            customer_id: customerId,
            items: [{
                item_id: product.id,
                quantity: quantity,
                rate: product.price
            }],
            notes: `Online Order for ${product.name}`
        });

        if (!orderResult.success) {
            return NextResponse.json(
                { error: orderResult.error || 'Failed to create Sales Order' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            orderId: orderResult.order_id,
            message: 'Order created successfully'
        });

    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
