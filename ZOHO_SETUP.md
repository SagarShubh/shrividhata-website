# Zoho Inventory Setup Guide

You need 4 pieces of information to connect your website to Zoho Inventory.

## 1. Where to add them?
Open the file named `.env.local` in your project root folder.
Add these lines to the bottom:

```env
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_INVENTORY_ORG_ID=
```

---

## 2. How to get the Credentials?

### Step A: Create the App in Zoho
1. Go to the [Zoho API Console](https://api-console.zoho.in/) (use `.com` if your account is US-based).
2. Click **Add Client** > Choose **Server-based Applications**.
3. Fill in:
   - **Client Name**: `ShriVidhata Web`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorized Redirect URIs**: `http://localhost:3000/api/auth/callback/zoho` (Disregard that this route doesn't exist yet, we just need a valid URI for the token generation).
4. Click **Create**.
5. Copy the **Client ID** and **Client Secret**.
   - Paste them into `ZOHO_CLIENT_ID` and `ZOHO_CLIENT_SECRET` in your `.env.local` file.

### Step B: Get the Refresh Token (The Tricky Part)
Zoho uses OAuth. You need to do a one-time "handshake" to get a token that lasts forever.

1. **Generate the Authorization Code**:
   Copy and paste this URL into your browser (replace `YOUR_CLIENT_ID` with the one you just got):
   
   ```
   https://accounts.zoho.in/oauth/v2/auth?scope=ZohoInventory.FullAccess.all,ZohoBooks.FullAccess.all&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=http://localhost:3000/api/auth/callback/zoho
   ```
   
   *Note: If your account is `.com`, change `accounts.zoho.in` to `accounts.zoho.com`.*

2. **Authorize**:
   It will ask you to login and click "Accept". 
   
3. **Get the Code**:
   After accepting, you will be redirected to localhost (it might show a 404 error, that's FINE).
   Look at the URL in your browser address bar. It will look like:
   `http://localhost:3000/api/auth/callback/zoho?code=1000.xxxxxxx.xxxxxxx&location=...`
   
   Copy the text after `code=` (up to the `&`). This is your **Grant Code**.

4. **Exchange Code for Refresh Token**:
   You have 60 seconds to use this code. Open your terminal and run this command (replace values):

   ```bash
   curl -X POST "https://accounts.zoho.in/oauth/v2/token?code=YOUR_GRANT_CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=http://localhost:3000/api/auth/callback/zoho&grant_type=authorization_code"
   ```

   The output will look like:
   ```json
   {
     "access_token": "...",
     "refresh_token": "1000.xxxxxxxxx...", 
     ...
   }
   ```
   
   Copy the `refresh_token` value.
   - Paste it into `ZOHO_REFRESH_TOKEN` in `.env.local`.

### Step C: Get Organization ID
1. Log in to [Zoho Inventory](https://inventory.zoho.in/).
2. Click on the profile icon (top right) -> "Manage Organizations".
3. Or simpler: Look at your browser URL when you are on the dashboard.
   It usually looks like: `https://inventory.zoho.in/app/123456789#/dashboard`
   The number `123456789` is your **Organization ID**.
   - Paste it into `ZOHO_INVENTORY_ORG_ID` in `.env.local`.

---

## 3. Verify
Once you've saved the `.env.local` file:
1. Restart your server if it's running (Control+C, then `npm run dev`).
2. Visit `http://localhost:3000/api/debug-zoho` to check the connection.
