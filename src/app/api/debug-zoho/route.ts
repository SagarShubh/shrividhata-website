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
    let tokenResponse = null;

    try {
        if (clientId && clientSecret && refreshToken) {
            // TRY .IN (India DC)
            const url = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;
            const res = await fetch(url, { method: 'POST' });
            tokenResponse = await res.json();
        } else {
            tokenResponse = { error: "Missing environment variables for token refresh." };
        }

        // 2. Try to fetch Items to verify scopes and data
        let itemsStatus = "Not Attempted";
        let fetchedItems = [];
        let itemsData: any = {}; // Define outer scope

        if (tokenResponse && tokenResponse.access_token && orgId) {
            try {
                // Fetch active items
                const itemsRes = await fetch(`https://www.zohoapis.in/books/v3/items?organization_id=${orgId}&status=active`, {
                    headers: {
                        'Authorization': `Zoho-oauthtoken ${tokenResponse.access_token}`,
                    },
                    cache: 'no-store'
                });

                itemsData = await itemsRes.json();
                if (itemsData.code === 0) {
                    itemsStatus = "Success";
                    fetchedItems = itemsData.items.slice(0, 5).map((i: any) => ({
                        id: i.item_id,
                        name: i.name,
                        status: i.status,
                        has_image: !!i.image_name,
                        cf_product_image: i.cf_product_image || 'N/A',
                        cf_image: i.cf_image || 'N/A'
                    }));
                } else {
                    itemsStatus = `Failed: ${itemsData.message}`;
                }

            } catch (err: any) {
                itemsStatus = `Error: ${err.message}`;
            }
        } else if (!orgId) {
            itemsStatus = "Skipped: ZOHO_INVENTORY_ORG_ID is missing.";
        } else {
            itemsStatus = "Skipped: No access token available.";
        }


        return NextResponse.json({
            message: "Zoho Debug Report",
            envStatus,
            tokenStatus: tokenResponse && tokenResponse.error ? "Failed" : "Success",
            itemsStatus,
            sampleItems: fetchedItems,
            // Dump the FIRST raw item completely so we can see the ACTUAL custom field names
            rawItemInspector: itemsData.items ? itemsData.items[0] : null,
            zohoAuthResponse: tokenResponse
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
