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

        // 4. Send Email Alert (Async - don't block response)
        try {
            const { Resend } = require('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);

            await resend.emails.send({
                from: "ShriVidhata Shop <contacts@shrividhata.com>",
                to: ["contacts@shrividhata.com"],
                subject: `💰 New Order: ${product.name}`,
                html: `
                    <h1>New Order Recieved!</h1>
                    <p><strong>Order ID:</strong> ${orderResult.order_id}</p>
                    <p><strong>Customer:</strong> ${shippingDetails.name} (${shippingDetails.phone})</p>
                    <p><strong>Product:</strong> ${product.name}</p>
                    <p><strong>Price:</strong> ₹${product.price}</p>
                    <br/>
                    <a href="https://inventory.zoho.in/app/items" style="padding: 10px 20px; background: #0070f3; color: white; text-decoration: none; border-radius: 5px;">View in Zoho Inventory</a>
                `
            });
        } catch (mailError) {
            console.error("Email Alert Failed:", mailError);
            // Don't fail the order just because email failed
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
