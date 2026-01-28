import { promises as fs } from 'fs';
import path from 'path';
import { HeroSlide } from './hero-types';

const CONFIG_PATH = path.join(process.cwd(), 'src/data/hero-config.json');

export async function getHeroConfig(): Promise<HeroSlide[]> {
    try {
        const data = await fs.readFile(CONFIG_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read hero config:', error);
        return [];
    }
}

export async function saveHeroConfig(slides: HeroSlide[]): Promise<{ success: boolean; error?: string }> {
    try {
        await fs.writeFile(CONFIG_PATH, JSON.stringify(slides, null, 2), 'utf-8');
        return { success: true };
    } catch (error) {
        console.error('Failed to save hero config:', error);
        return { success: false, error: 'Failed to write configuration file.' };
    }
}
