import { NextResponse } from 'next/server';
import { createSalesOrder, findOrCreateContact, CustomerData } from '@/lib/zoho-inventory';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, shippingDetails } = body;

        if (!items || items.length === 0 || !shippingDetails) {
            return NextResponse.json(
                { error: 'Missing items or shipping details' },
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
                state: ''
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

        // Filter/Validate Items
        const invalidItems = items.filter((item: any) =>
            typeof item.id === 'string' && (
                item.id.startsWith('cam-') ||
                item.id.startsWith('rec-') ||
                item.id.startsWith('sto-') ||
                item.id.startsWith('acc-')
            )
        );

        if (invalidItems.length > 0) {
            return NextResponse.json(
                { error: 'Cart contains demo items that cannot be purchased. Please remove them and try again.' },
                { status: 400 }
            );
        }

        const salesOrderItems = items.map((item: any) => ({
            item_id: item.id,
            quantity: item.quantity,
            rate: item.price
        }));

        const orderResult = await createSalesOrder({
            customer_id: customerId,
            items: salesOrderItems,
            notes: `Online Order via Store Checkout`
        });

        if (!orderResult.success) {
            return NextResponse.json(
                { error: orderResult.error || 'Failed to create Sales Order' },
                { status: 500 }
            );
        }

        // 4. Send Email Alert (Async - don't block response)
        try {
            // A. Trigger Zoho Official Email (includes Payment Link)
            // DISABLED: User requested Manual Confirmation workflow (Order -> Confirm -> Pay)
            // The admin will manually confirm the draft order and send the payment link.
            /*
            const { emailSalesOrder } = require('@/lib/zoho-inventory');
            console.log("Triggering Zoho Payment Email...");
            emailSalesOrder(orderResult.order_id, shippingDetails.email).then((success: boolean) => {
                if (success) console.log(`Zoho Email sent to ${shippingDetails.email}`);
                else console.error("Failed to send Zoho Email");
            });
            */

            // B. Send Admin Alert via Resend
            const { Resend } = require('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);

            const itemsListHtml = items.map((item: any) =>
                `<li>${item.name} x ${item.quantity} - ₹${item.price}</li>`
            ).join('');

            await resend.emails.send({
                from: "ShriVidhata Shop <contacts@shrividhata.com>",
                to: ["contacts@shrividhata.com"],
                subject: `💰 New Order Recieved! (ID: ${orderResult.order_id})`,
                html: `
                    <h1>New Order Recieved!</h1>
                    <p><strong>Order ID:</strong> ${orderResult.order_id} (DRAFT)</p>
                    <p><strong>Customer:</strong> ${shippingDetails.name} (${shippingDetails.phone})</p>
                    
                    <h3>Items:</h3>
                    <ul>
                        ${itemsListHtml}
                    </ul>
                    
                    <a href="https://inventory.zoho.in/app/salesorders/${orderResult.order_id}" style="padding: 10px 20px; background: #0070f3; color: white; text-decoration: none; border-radius: 5px;">Review & Confirm in Zoho</a>
                `
            });
        } catch (mailError) {
            console.error("Email Alert Failed:", mailError);
            // Don't fail the order just because email failed
        }

        return NextResponse.json({
            success: true,
            orderId: orderResult.order_id,
            message: 'Order placed! We will confirm availability and send you a payment link shortly.'
        });

    } catch (error: any) {
        console.error("Checkout Error:", error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
