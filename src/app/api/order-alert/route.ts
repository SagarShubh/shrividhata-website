import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId, product, amount, customerName, shipping } = body;

        // Validation
        if (!orderId || !product) {
            return NextResponse.json(
                { success: false, message: "Missing required order details." },
                { status: 400 }
            );
        }

        const shippingHtml = shipping ? `
            <div style="background: #ffffff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; margin-top: 15px;">
                <h3 style="margin-top: 0; color: #374151;">📦 Shipping Details</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${shipping.name}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${shipping.phone}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${shipping.email}</p>
                <p style="margin: 5px 0;"><strong>Address:</strong><br/>
                ${shipping.address},<br/>
                ${shipping.city} - ${shipping.pincode}</p>
            </div>
        ` : '';

        // Send Email to Admin (YOU)
        const { data: emailData, error } = await resend.emails.send({
            from: "ShriVidhata Shop <onboarding@resend.dev>",
            to: ["shrividhata.official@gmail.com"],
            subject: `💰 New Order Recieved! ₹${amount} - ${product}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">New Order Confirmed! 🎉</h2>
                    <p>A new purchase has been completed on your website.</p>
                    
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Product:</strong> ${product}</p>
                        <p><strong>Amount:</strong> ₹${amount}</p>
                        <p><strong>Order ID:</strong> ${orderId}</p>
                        <p><strong>Customer:</strong> ${customerName || 'Guest'}</p>
                    </div>

                    ${shippingHtml}

                    <p style="margin-top: 20px; font-size: 14px; color: #666;">
                        Please ship this item immediately and send tracking details to the customer's email.
                    </p>

                    <a href="https://payments.zoho.in/app/home" style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                        View in Zoho Payments
                    </a>
                </div>
            `,
        });

        if (error) {
            console.error("Resend Alert Error:", error);
        }

        return NextResponse.json({ success: true, message: "Alert sent!" });
    } catch (error) {
        console.error("Error processing order alert:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}
