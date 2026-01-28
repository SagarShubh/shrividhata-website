export type Category = 'Cameras' | 'Recorders' | 'Storage' | 'Accessories' | 'Networking';
export type SubCategory =
    | 'Dome Camera'
    | 'Bullet Camera'
    | 'PTZ Camera'
    | 'WiFi Camera'
    | 'DVR'
    | 'NVR'
    | 'Hard Drive'
    | 'SD Card'
    | 'Cable'
    | 'Power Supply'
    | 'Connector'
    | 'Switch'
    | 'Router';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    subCategory: SubCategory;
    image: string;
    features: string[];
    stock: boolean;
    brand?: string;
    brandLogo?: string; // Path to brand logo in public/brands
    stripePriceId?: string; // For future integration
}

export const products: Product[] = [
    // CAMERAS
    {
        id: 'cam-001',
        name: 'ProHD 4MP Dome Camera',
        description: 'High-definition indoor dome camera with night vision and wide-angle lens. Perfect for office and home surveillance.',
        price: 2499,
        category: 'Cameras',
        subCategory: 'Dome Camera',
        image: '/products/dome-cam.jpg',
        features: ['4MP Resolution', 'Night Vision (20m)', 'Motion Detection', 'Wide Dynamic Range'],
        stock: true,
        brand: 'Hikvision',
        brandLogo: '/brands/hikvision.png'
    },
    {
        id: 'cam-002',
        name: 'Weatherproof Bullet Camera 5MP',
        description: 'Rugged outdoor bullet camera with IP67 weather resistance and long-range IR.',
        price: 3299,
        category: 'Cameras',
        subCategory: 'Bullet Camera',
        image: '/products/bullet-cam.jpg',
        features: ['5MP Resolution', 'IP67 Waterproof', 'Night Vision (30m)', 'Smart IR'],
        stock: true,
        brand: 'CP Plus',
        brandLogo: '/brands/cpplus.png'
    },
    {
        id: 'cam-003',
        name: '360° PTZ Speed Dome',
        description: 'Pan-Tilt-Zoom camera with 25x optical zoom for complete area coverage.',
        price: 12500,
        category: 'Cameras',
        subCategory: 'PTZ Camera',
        image: '/products/ptz-cam.jpg',
        features: ['25x Optical Zoom', '360° Rotation', 'Auto Tracking', 'Two-way Audio'],
        stock: true,
        brand: 'Hikvision',
        brandLogo: '/brands/hikvision.png'
    },
    {
        id: 'cam-004',
        name: 'Smart WiFi Indoor Camera',
        description: 'Wireless camera with mobile app support, ideal for baby monitoring or small shops.',
        price: 1899,
        category: 'Cameras',
        subCategory: 'WiFi Camera',
        image: '/products/wifi-cam.jpg',
        features: ['1080p HD', 'WiFi Connection', 'Two-way Audio', 'Cloud Storage Support'],
        stock: true,
        brand: 'Ezviz',
        brandLogo: '/brands/ezviz.png'
    },

    // RECORDERS
    {
        id: 'rec-001',
        name: '8-Channel DVR 1080p',
        description: 'Supports up to 8 analog cameras with H.265+ compression for efficient storage.',
        price: 4500,
        category: 'Recorders',
        subCategory: 'DVR',
        image: '/products/dvr-8ch.jpg',
        features: ['8 Channels', 'H.265+ Compression', 'HDMI/VGA Output', 'Mobile App View'],
        stock: true,
        brand: 'CP Plus',
        brandLogo: '/brands/cpplus.png'
    },
    {
        id: 'rec-002',
        name: '16-Channel 4K NVR',
        description: 'Professional grade Network Video Recorder supporting up to 4K resolution IP cameras.',
        price: 8999,
        category: 'Recorders',
        subCategory: 'NVR',
        image: '/products/nvr-16ch.jpg',
        features: ['16 Channels', '4K Support', 'PoE Ports', 'Smart Analytics'],
        stock: true,
        brand: 'Hikvision',
        brandLogo: '/brands/hikvision.png'
    },

    // STORAGE
    {
        id: 'sto-001',
        name: '1TB Surveillance HDD',
        description: 'Optimized for 24/7 video recording reliability.',
        price: 3800,
        category: 'Storage',
        subCategory: 'Hard Drive',
        image: '/products/hdd-1tb.jpg',
        features: ['1TB Capacity', '24/7 Reliability', '5400 RPM', 'SATA 6Gb/s'],
        stock: true,
        brand: 'Seagate',
        brandLogo: '/brands/seagate.png'
    },
    {
        id: 'sto-002',
        name: '4TB Surveillance HDD',
        description: 'Massive storage for long-term retention of high-definition footage.',
        price: 8500,
        category: 'Storage',
        subCategory: 'Hard Drive',
        image: '/products/hdd-4tb.jpg',
        features: ['4TB Capacity', 'AllFrame Technology', 'Workload Rating 180TB/yr', '3-Year Warranty'],
        stock: true,
        brand: 'WD Purple',
        brandLogo: '/brands/prama.jpg' // Using Prama/WD placeholder
    },

    // ACCESSORIES
    {
        id: 'acc-001',
        name: 'Cat6 Ethernet Cable (305m)',
        description: 'High-speed network cable for IP camera installations. Full box.',
        price: 4200,
        category: 'Accessories',
        subCategory: 'Cable',
        image: '/products/cat6-cable.jpg',
        features: ['305m Bundle', 'Pure Copper', 'High Speed Data', 'Durable Jacket'],
        stock: true,
        brand: 'D-Link',
        brandLogo: '/brands/dahua.png' // Using Dahua/Misc for now or generic
    },
    {
        id: 'acc-002',
        name: '12V 4 Channel Power Supply',
        description: 'Centralized power distribution box for up to 4 cameras.',
        price: 850,
        category: 'Accessories',
        subCategory: 'Power Supply',
        image: '/products/power-supply.jpg',
        features: ['4 Channel Output', 'Short Circuit Protection', 'Metal Housing', 'lockable'],
        stock: true,
    },
    {
        id: 'acc-003',
        name: 'BNC & DC Connector Pack (10 Pairs)',
        description: 'Essential connectors for analog camera setups.',
        price: 350,
        category: 'Accessories',
        subCategory: 'Connector',
        image: '/products/connectors.jpg',
        features: ['10 BNC', '10 DC', 'Screw Terminal', 'Gold Plated Pin'],
        stock: true,
    },
];
