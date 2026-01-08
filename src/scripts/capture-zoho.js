const http = require('http');
const url = require('url');
const https = require('https');

// UPDATE: Using the NEW credentials found in .env.local
const CLIENT_ID = '1000.L4L0Y4CE5OAOLU8RRIKLMTRXHQXCCY';
const CLIENT_SECRET = '777b089561d560b129fccaff04fc939bd667bbf5f7';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/zoho';

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const code = parsedUrl.query.code;

    if (code) {
        console.log('CAPTURED_CODE:', code);

        // Exchange immediately
        const tokenUrl = `https://accounts.zoho.in/oauth/v2/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`;

        // Perform Request
        const tokenReq = https.request(tokenUrl, { method: 'POST' }, (tokenRes) => {
            let data = '';
            tokenRes.on('data', chunk => data += chunk);
            tokenRes.on('end', () => {
                console.log('TOKEN_RESPONSE:', data);

                try {
                    const json = JSON.parse(data);
                    if (json.refresh_token) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(`<h1>SUCCESS!</h1><p>Refresh Token Generated: ${json.refresh_token}</p><p>You can close this window.</p>`);
                    } else if (json.error) {
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        res.end(`<h1>Error: ${json.error}</h1><p>Check terminal logs.</p>`);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(`<h1>Response Received</h1><pre>${data}</pre>`);
                    }
                } catch (e) {
                    res.writeHead(500);
                    res.end('Error parsing response');
                }
            });
        });

        tokenReq.on('error', (e) => {
            console.error(e);
            res.writeHead(500);
            res.end('Network Error');
        });

        tokenReq.end();

    } else {
        // Favicon or other requests
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Smart Capture server running on port 3000');
});
