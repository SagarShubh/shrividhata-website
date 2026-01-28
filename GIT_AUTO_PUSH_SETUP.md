# Setup Guide: Auto-Git-Push for Admin

To enable the Admin Panel to update your live website automatically, you need to provide it with permission to write to your GitHub repository.

## Step 1: Generate a GitHub Access Token

1.  Log in to your GitHub account.
2.  Go to **Settings** (click your profile photo > Settings).
3.  Scroll down to **Developer settings** (bottom left).
4.  Click **Personal access tokens** -> **Tokens (classic)**.
5.  Click **Generate new token** -> **Generate new token (classic)**.
6.  **Note**: "Admin Auto Push" (or similar).
7.  **Expiration**: Set to "No expiration" (or 90 days if you prefer to rotate).
8.  **Scopes**: Check the box for **`repo`** (Full control of private repositories).
    *   This is required to read/write the `hero-config.json` file.
9.  Click **Generate token**.
10. **COPY THE TOKEN IMMEDIATELY**. You won't see it again.

## Step 2: Configure Environment Variables

### In Vercel (For Live Site)
1.  Go to your Vercel Dashboard -> Select Project (`shrividhata-website`).
2.  Go to **Settings** -> **Environment Variables**.
3.  Add a new variable:
    *   **Key**: `GITHUB_TOKEN`
    *   **Value**: (Paste your token here starting with `ghp_...`)
4.  Add another variable (Optional if sticking to default):
    *   **Key**: `GITHUB_REPO`
    *   **Value**: `SagarShubh/shrividhata-website`
5.  **Redeploy** your latest deployment (or push a new commit) for these changes to take effect.

### Locally (For Testing)
1.  Open `.env.local` in your project root.
2.  Add:
    ```env
    GITHUB_TOKEN=ghp_your_token_here
    GITHUB_REPO=SagarShubh/shrividhata-website
    ```
3.  Restart your dev server (`npm run dev`).

## Verification
1.  Go to `/admin/hero`.
2.  Change a slide Title.
3.  Click **Save Configuration**.
4.  If successful, you will see: "Configuration saved & pushed to GitHub! Deployment triggered. 🚀"
5.  Check your GitHub repo manifest, you should see a new commit named "chore(admin): update hero configuration via admin panel".
