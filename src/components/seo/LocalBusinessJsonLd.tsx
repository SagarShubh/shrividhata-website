export function LocalBusinessJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ShriVidhata Creations Services (OPC) Pvt. Ltd.",
        "image": "https://shrividhata.com/og-image.jpg",
        "url": "https://shrividhata.com",
        "telephone": "+918989000247",
        "email": "contacts@shrividhata.com",
        "priceRange": "₹₹",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shop No. 2, Near SBI Udawatganj, Mangalwariya",
            "addressLocality": "Narsinghgarh",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "465669",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 23.7082,
            "longitude": 77.0963
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Narsinghgarh"
            },
            {
                "@type": "City",
                "name": "Bhopal"
            },
            {
                "@type": "City",
                "name": "Indore"
            },
            {
                "@type": "City",
                "name": "Rajgarh"
            },
            {
                "@type": "City",
                "name": "Biaora"
            },
            {
                "@type": "City",
                "name": "Sehore"
            },
            {
                "@type": "City",
                "name": "Shajapur"
            },
            {
                "@type": "City",
                "name": "Vidisha"
            },
            {
                "@type": "City",
                "name": "Ujjain"
            },
            {
                "@type": "City",
                "name": "Dewas"
            }
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            "opens": "09:00",
            "closes": "20:00"
        },
        "sameAs": [
            "https://www.facebook.com/ShriVidhata/",
            "https://www.instagram.com/shrividhata_cctv/"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
