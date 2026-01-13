import { NextRequest, NextResponse } from 'next/server';
import { getZohoItemImage } from '@/lib/zoho-inventory';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const itemId = searchParams.get('itemId');

    if (!itemId) {
        return new NextResponse('Missing Item ID', { status: 400 });
    }

    const { blob, type, error } = await getZohoItemImage(itemId);

    if (!blob) {
        console.error(`Image Proxy Failed for itemId: ${itemId}. Error: ${error}`);
        // Return the error to the browser so the user can see WHY it failed
        return new NextResponse(`Image Proxy Failed: ${error}`, { status: 500 });
    }

    console.log(`Image Proxy Success: ${itemId}, Type: ${type}, Size: ${blob.size}`);

    return new NextResponse(blob, {
        headers: {
            'Content-Type': type,
            'Cache-Control': 'public, max-age=3600, s-maxage=3600'
        }
    });
}
