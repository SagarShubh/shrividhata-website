const https = require('https');

// Helper to make requests
function request(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });
        req.on('error', reject);
        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function verifyZoho() {
    console.log('--- Zoho Verification ---');
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const orgId = process.env.ZOHO_INVENTORY_ORG_ID;

    console.log('Checking Environment Variables:');
    console.log('ZOHO_CLIENT_ID:', clientId ? 'OK' : 'MISSING');
    console.log('ZOHO_CLIENT_SECRET:', clientSecret ? 'OK' : 'MISSING');
    console.log('ZOHO_REFRESH_TOKEN:', refreshToken ? 'OK' : 'MISSING');
    console.log('ZOHO_INVENTORY_ORG_ID:', orgId ? 'OK' : 'MISSING');

    if (!clientId || !clientSecret || !refreshToken) {
        console.error('❌ Missing credentials');
        process.exit(1);
    }

    // 1. Refresh Token
    console.log('\n1. Refreshing Access Token...');
    const tokenUrl = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;

    try {
        const tokenRes = await request(tokenUrl, { method: 'POST' });

        if (tokenRes.body.error) {
            console.error('❌ Token Refresh Failed:', tokenRes.body);
            process.exit(1);
        }

        const accessToken = tokenRes.body.access_token;
        console.log('✅ Access Token Generated');

        // 2. Fetch Organizations (Start with Books API .in)
        console.log('\n2. Fetching Organizations (Books API .in)...');
        const orgUrl = 'https://www.zohoapis.in/books/v3/organizations';
        const orgRes = await request(orgUrl, {
            headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
        });

        if (orgRes.status !== 200) {
            console.log('❌ Books API (.in) Org Fetch Failed:', orgRes.body.message);
        } else {
            console.log('✅ Books API (.in) Org Fetch Success');
        }

        // 3. Fetch Items (.in)
        console.log('\n3. Fetching Items from Books API (.in)...');
        const itemsUrl = `https://www.zohoapis.in/books/v3/items?organization_id=${orgId}&status=active`;
        const itemsRes = await request(itemsUrl, {
            headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
        });

        if (itemsRes.status !== 200) {
            console.error('❌ Failed to fetch items from Books API (.in):', itemsRes.body);

            // Try Inventory API (.in)
            console.log('\n4. Trying Inventory API (.in) instead...');
            const invUrl = `https://inventory.zoho.in/api/v1/items?organization_id=${orgId}&status=active`;
            const invRes = await request(invUrl, {
                headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
            });

            if (invRes.status === 200) {
                console.log('✅ Inventory API (.in) worked!');
                console.log('Count:', invRes.body.items?.length);
            } else {
                console.error('❌ Inventory API (.in) also failed:', invRes.body);

                // Try .com data center
                console.log('\n5. Trying .com Data Center (Books API)...');
                const comUrl = `https://books.zoho.com/api/v3/items?organization_id=${orgId}&status=active`;
                const comRes = await request(comUrl, {
                    headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
                });

                if (comRes.status === 200) {
                    console.log('✅ .com Books API worked!');
                    console.log('Count:', comRes.body.items?.length);
                } else {
                    console.error('❌ .com Books API failed:', comRes.body);
                }
            }

        } else {
            console.log('✅ Items fetched successfully from Books API (.in)');
            console.log('Count:', itemsRes.body.items?.length);
        }

    } catch (e) {
        console.error('Exception during verification:', e);
    }
}

verifyZoho();
