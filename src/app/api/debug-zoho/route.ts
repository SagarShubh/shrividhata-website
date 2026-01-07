import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const orgId = process.env.ZOHO_INVENTORY_ORG_ID;

    const status = {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        hasRefreshToken: !!refreshToken,
        hasOrgId: !!orgId,
        connection: 'UNKNOWN',
        error: null as string | null,
        dataPreview: null as any
    };

    if (!clientId || !clientSecret || !refreshToken || !orgId) {
        status.connection = 'MISSING_CREDENTIALS';
        return NextResponse.json(status);
    }

    try {
        // 1. Get Access Token
        const tokenUrl = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;
        const tokenRes = await fetch(tokenUrl, { method: 'POST' });
        const tokenData = await tokenRes.json();

        if (tokenData.error) {
            status.connection = 'AUTH_FAILED';
            status.error = JSON.stringify(tokenData);
            return NextResponse.json(status);
        }

        const accessToken = tokenData.access_token;

        // 2. Fetch Organizations (to verify access and ID)
        const orgUrl = `https://books.zoho.in/api/v3/organizations`;
        const orgRes = await fetch(orgUrl, {
            headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
        });

        if (!orgRes.ok) {
            status.connection = 'API_ERROR_ORG_FETCH';
            // @ts-ignore
            status.error = await orgRes.text();
            return NextResponse.json(status);
        }

        const orgData = await orgRes.json();

        // 3. Just return the Org Data to see what we have
        status.connection = 'SUCCESS_ORG_LIST';
        status.dataPreview = orgData;

        // 3. Fetch Items from Zoho Books API (same as application logic)
        const itemsUrl = `https://books.zoho.in/api/v3/items?organization_id=${orgId}&status=active`;
        const itemsRes = await fetch(itemsUrl, {
            headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
        });

        if (!itemsRes.ok) {
            status.connection = 'API_ERROR_ITEMS_FETCH';
            // @ts-ignore
            status.error = await itemsRes.text();
            return NextResponse.json(status);
        }

        const itemsData = await itemsRes.json();
        status.connection = 'SUCCESS';
        status.dataPreview = {
            orgs: orgData,
            itemsCount: itemsData.items?.length,
            firstItem: itemsData.items?.[0]
        };

        return NextResponse.json(status);



    } catch (e: any) {
        status.connection = 'EXCEPTION';
        status.error = e.message;
    }

    return NextResponse.json(status);
}
