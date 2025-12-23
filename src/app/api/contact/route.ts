import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, phone, message } = data;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        // Send the email
        const { data: emailData, error } = await resend.emails.send({
            from: "ShriVidhata Website <onboarding@resend.dev>", // Use the generic Resend address for now
            to: ["contacts@shrividhta.com"], // Sent to the business email
            replyTo: email, // Allow replying directly to the customer
            subject: `New Enquiry from ${name}`,
            html: `
                <h2>New Website Enquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                    ${message}
                </blockquote>
            `,
        });

        if (error) {
            console.error("Resend API Error details:", JSON.stringify(error, null, 2));
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to send email.",
                    error: error.message
                },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}
