import { NextRequest, NextResponse } from 'next/server';
import { getZohoItemImage } from '@/lib/zoho-inventory';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const itemId = searchParams.get('itemId');

    if (!itemId) {
        return new NextResponse('Missing Item ID', { status: 400 });
    }

    const { blob, type } = await getZohoItemImage(itemId);

    if (!blob) {
        console.error(`Image Proxy Failed for itemId: ${itemId}. Redirecting to fallback.`);
        // Fallback to a valid existing image if fetch failed
        // We do not have 'placeholder.jpg', so using a generic one
        return NextResponse.redirect(new URL('/products/connectors.jpg', request.url));
    }

    console.log(`Image Proxy Success: ${itemId}, Type: ${type}, Size: ${blob.size}`);

    return new NextResponse(blob, {
        headers: {
            'Content-Type': type,
            'Cache-Control': 'public, max-age=3600, s-maxage=3600'
        }
    });
}
