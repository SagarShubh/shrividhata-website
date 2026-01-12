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
        // Fallback to placeholder if fetch failed
        return NextResponse.redirect(new URL('/placeholder.jpg', request.url));
    }

    return new NextResponse(blob, {
        headers: {
            'Content-Type': type,
            'Cache-Control': 'public, max-age=3600, s-maxage=3600'
        }
    });
}
