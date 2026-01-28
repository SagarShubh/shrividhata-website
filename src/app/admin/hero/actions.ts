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
