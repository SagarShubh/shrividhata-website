import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, currency = 'INR', description, customer } = body;

        // TODO: Replace with your actual Env Variables
        const apiKey = process.env.ZOHO_PAYMENTS_API_KEY;
        const orgId = process.env.ZOHO_PAYMENTS_ORG_ID; // Your Organization ID
        const apiDomain = 'https://payments.zoho.in'; // Use .in for India, .com for Global

        if (!apiKey) {
            console.warn("Zoho Payments API Key missing. Simulating response for UI testing.");
            // Simulate a success for UI testing without real keys
            // In reality, this would fail if no keys are present
            return NextResponse.json({
                payment_session_id: 'mock_session_' + Date.now(),
                mock_mode: true
            });
        }

        // Official Zoho Create Payment Session Endpoint
        const response = await fetch(`${apiDomain}/api/v1/payment_sessions`, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${apiKey}`, // Check docs: might be 'Zoho-oauthtoken' or just 'Authorization' depending on Auth type
                'Content-Type': 'application/json',
                'X-ZOHO-ORG-ID': orgId || '',
            },
            body: JSON.stringify({
                amount,
                currency_code: currency,
                description,
                customer_id: customer?.id, // If you have a customer ID
                // ... add other required fields per Zoho Docs
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create payment session');
        }

        return NextResponse.json(data);

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
