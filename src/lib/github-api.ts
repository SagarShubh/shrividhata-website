import { HeroSlide } from "./hero-types";

const GITHUB_API_BASE = "https://api.github.com";

interface GitHubUpdateOptions {
    token: string;
    owner: string;
    repo: string;
    path: string;
    content: string; // JSON string access
    message: string;
}

export async function updateGitHubFile(options: GitHubUpdateOptions) {
    const { token, owner, repo, path, content, message } = options;
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;

    try {
        // 1. Get the current file SHA
        const getRes = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3+json",
            },
            cache: "no-store",
        });

        if (!getRes.ok) {
            // Handle case where file might not exist yet (though unlikely for our use case)
            if (getRes.status !== 404) {
                const errorText = await getRes.text();
                throw new Error(`Failed to fetch file SHA: ${getRes.status} ${errorText}`);
            }
        }

        const getData = await getRes.json();
        const sha = getData.sha;

        // 2. Update the file
        // GitHub API requires content to be Base64 encoded
        const encodedContent = Buffer.from(content).toString('base64');

        const putRes = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                content: encodedContent,
                sha, // Required to update existing file
            }),
        });

        if (!putRes.ok) {
            const errorText = await putRes.text();
            throw new Error(`Failed to update file: ${putRes.status} ${errorText}`);
        }

        return { success: true };

    } catch (error: any) {
        console.error("GitHub API Error:", error);
        return { success: false, error: error.message };
    }
}
