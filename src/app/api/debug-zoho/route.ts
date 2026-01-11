import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const orgId = process.env.ZOHO_INVENTORY_ORG_ID;

    // 1. Check if ENV Vars exist
    const envStatus = {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        hasRefreshToken: !!refreshToken,
        hasOrgId: !!orgId,
        // Show first few chars to verify it's not empty text
        clientIdStart: clientId ? clientId.substring(0, 4) + '***' : 'MISSING',
    };

    // 2. Try to manually fetch token to see the EXACT error
    let zohoResponse = null;

    if (clientId && clientSecret && refreshToken) {
        try {
            // TRY .IN (India DC)
            const url = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;
            const res = await fetch(url, { method: 'POST' });
            zohoResponse = await res.json();
        } catch (e: any) {
            zohoResponse = { error: "Fetch Failed", details: e.message };
        }
    }

    return NextResponse.json({
        message: "Zoho Debug Report",
        envStatus,
        zohoResponse
    });
}
