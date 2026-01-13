import { NextResponse } from 'next/server';
import { getSalesOrder } from '@/lib/zoho-inventory';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
        return NextResponse.json(
            { error: 'Order ID is required' },
            { status: 400 }
        );
    }

    try {
        const order = await getSalesOrder(orderId);

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found or invalid Order ID' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, order });

    } catch (error: any) {
        console.error('Tracking API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
