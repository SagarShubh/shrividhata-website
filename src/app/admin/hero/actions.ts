'use server';

import { saveHeroConfig } from "@/lib/hero-config";
import { HeroSlide } from "@/lib/hero-types";
import { updateGitHubFile } from "@/lib/github-api";
import { revalidatePath } from "next/cache";

export async function updateHeroConfigAction(slides: HeroSlide[]) {
    // 1. Always save locally (good for testing and immediate feedback in dev)
    const localRes = await saveHeroConfig(slides);

    // 2. If configured, push to GitHub
    const token = process.env.GITHUB_TOKEN;
    const repoSlug = process.env.GITHUB_REPO || "SagarShubh/shrividhata-website"; // Default repo

    if (token) {
        const [owner, repo] = repoSlug.split('/');

        try {
            const githubRes = await updateGitHubFile({
                token,
                owner,
                repo,
                path: "src/data/hero-config.json",
                content: JSON.stringify(slides, null, 2),
                message: "chore(admin): update hero configuration via admin panel"
            });

            if (!githubRes.success) {
                console.error("GitHub Auto-Push Failed:", githubRes.error);
                return {
                    success: true,
                    message: `Saved locally, but GitHub Push failed: ${githubRes.error}. Please check tokens.`
                };
            }

            revalidatePath('/');
            revalidatePath('/admin/hero');
            return { success: true, message: "Configuration saved & pushed to GitHub! Deployment triggered. 🚀" };

        } catch (error: any) {
            return { success: true, message: `Saved locally. GitHub Error: ${error.message}` };
        }
    }

    // Fallback if no token (Local Developement)
    if (localRes.success) {
        revalidatePath('/');
        revalidatePath('/admin/hero');
        return { success: true, message: "Configuration saved locally. (Configure GITHUB_TOKEN to enable auto-deploy)" };
    }

    return { success: false, message: localRes.error || "Failed to save configuration." };
}

export async function uploadHeroImageAction(formData: FormData) {
    const file = formData.get('file') as File;

    if (!file) {
        return { success: false, error: "No file provided" };
    }

    // 1. Validate file
    if (!file.type.startsWith("image/")) {
        return { success: false, error: "File must be an image" };
    }

    // 2. Prepare Path
    const timestamp = Date.now();
    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `public/hero-images/${timestamp}-${safeName}`;

    // 3. Convert to Base64
    const buffer = await file.arrayBuffer();
    const base64Content = Buffer.from(buffer).toString('base64');

    // 4. Push to GitHub
    const token = process.env.GITHUB_TOKEN;
    const repoSlug = process.env.GITHUB_REPO || "SagarShubh/shrividhata-website";

    if (token) {
        const [owner, repo] = repoSlug.split('/');

        const res = await updateGitHubFile({
            token,
            owner,
            repo,
            path: path,
            content: base64Content,
            message: `chore(admin): upload hero image ${safeName}`,
            isBase64: true
        });

        if (res.success) {
            // Note: The public URL on Vercel/Next.js will be /hero-images/...
            // The 'public/' prefix is removed in the URL
            const publicUrl = `/${path.replace('public/', '')}`;
            return { success: true, url: publicUrl, message: "Image uploaded to GitHub!" };
        } else {
            return { success: false, error: `GitHub Upload Failed: ${res.error}` };
        }
    } else {
        // Fallback: This action DOES NOT support local file writing because handling Next.js public folder writes in dev is flaky
        return { success: false, error: "GitHub Token required for image uploads. Admin > Auto-Git-Push." };
    }
}
