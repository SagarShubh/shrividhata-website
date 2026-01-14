const https = require('https');
const fs = require('fs');

// Simple env parser since we can't depend on dotenv
function loadEnv() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const env = {};
        envFile.split('\n').forEach(line => {
            const [key, val] = line.split('=');
            if (key && val) env[key.trim()] = val.trim();
        });
        return env;
    } catch (e) {
        return {};
    }
}

const env = loadEnv();
const REFRESH_TOKEN = env.ZOHO_REFRESH_TOKEN;
const CLIENT_ID = env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = env.ZOHO_CLIENT_SECRET;
const ORG_ID = env.ZOHO_INVENTORY_ORG_ID;

async function getAccessToken() {
    const url = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${REFRESH_TOKEN}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token`;

    return new Promise((resolve, reject) => {
        const req = https.request(url, { method: 'POST' }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data).access_token));
        });
        req.on('error', reject);
        req.end();
    });
}

async function getRecentOrder(token) {
    const url = `https://www.zohoapis.in/books/v3/salesorders?organization_id=${ORG_ID}&page=1&per_page=1`;

    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: { 'Authorization': `Zoho-oauthtoken ${token}` }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
        req.on('error', reject);
    });
}

(async () => {
    try {
        console.log("Fetching Token...");
        const token = await getAccessToken();
        console.log("Token received. Fetching Order...");
        const orders = await getRecentOrder(token);
        console.log(JSON.stringify(orders, null, 2));
    } catch (e) {
        console.error(e);
    }
})();
