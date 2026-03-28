import { sendTelegramMessage } from '@/libs/sendTelegramMessage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const rawData = body?.data;

        if (!rawData || typeof rawData !== 'string') {
            return NextResponse.json(
                { message: "Invalid request: 'data' is required", error_code: 1 },
                { status: 400 }
            );
        }

        let parsedData: any;
        try {
            parsedData = JSON.parse(rawData);
        } catch {
            return NextResponse.json(
                { message: 'Invalid JSON format', error_code: 4 },
                { status: 400 }
            );
        }

        try {
            await sendTelegramMessage(parsedData);
        } catch (notificationError: any) {
            console.error('Notification send error:', notificationError?.message || notificationError);
            return NextResponse.json(
                { message: 'Request received but notification failed', error_code: 5 },
                { status: 200 }
            );
        }

        return NextResponse.json({ message: 'Success', error_code: 0 }, { status: 200 });
    } catch (err) {
        console.error('Unhandled error:', err);
        return NextResponse.json(
            { message: 'Internal server error', error_code: 2 },
            { status: 500 }
        );
    }
}