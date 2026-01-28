'use server';

import { saveHeroConfig } from "@/lib/hero-config";
import { HeroSlide } from "@/lib/hero-types";
import { revalidatePath } from "next/cache";

export async function updateHeroConfigAction(slides: HeroSlide[]) {
    const result = await saveHeroConfig(slides);

    if (result.success) {
        revalidatePath('/'); // Revalidate home page
        revalidatePath('/admin/hero'); // Revalidate admin editor
        return { success: true, message: "Configuration saved successfully. Use Git to push to production." };
    }

    return { success: false, message: result.error || "Failed to save configuration." };
}
