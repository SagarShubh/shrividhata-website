export type HeroTheme = 'blue-gradient' | 'dark-tech' | 'minimal-clean' | 'ocean-blue' | 'purple-haze';

export interface HeroSlide {
    id: string;
    productId: string;
    theme: HeroTheme;
    customTitle?: string;
    customDescription?: string;
    brandLogo: string;
    image: string;
}

export const HERO_THEMES: Record<HeroTheme, { label: string; classes: string; textClass: string }> = {
    'blue-gradient': {
        label: 'Blue Gradient (Default)',
        classes: 'bg-gradient-to-br from-blue-50 via-white to-blue-50',
        textClass: 'text-slate-900'
    },
    'dark-tech': {
        label: 'Dark Tech Mode',
        classes: 'bg-[#0f172a]',
        textClass: 'text-white'
    },
    'minimal-clean': {
        label: 'Minimal Clean',
        classes: 'bg-white border-b border-slate-100',
        textClass: 'text-slate-900'
    },
    'ocean-blue': {
        label: 'Ocean Blue',
        classes: 'bg-gradient-to-br from-cyan-50 to-blue-100',
        textClass: 'text-slate-900'
    },
    'purple-haze': {
        label: 'Purple Haze',
        classes: 'bg-gradient-to-br from-violet-50 to-fuchsia-50',
        textClass: 'text-slate-900'
    }
};

export const BRANDS = [
    { label: 'Hikvision', value: 'Hikvision', logo: '/brands/hikvision.png' },
    { label: 'CP Plus', value: 'CP Plus', logo: '/brands/cpplus.png' },
    { label: 'Ezviz', value: 'Ezviz', logo: '/brands/ezviz.png' },
    { label: 'Dahua', value: 'Dahua', logo: '/brands/dahua.png' },
    { label: 'Seagate', value: 'Seagate', logo: '/brands/seagate.png' },
    { label: 'Western Digital', value: 'Western Digital', logo: '/brands/prama.jpg' },
    { label: 'D-Link', value: 'D-Link', logo: '/brands/dahua.png' },
];
