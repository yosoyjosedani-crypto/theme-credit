import ReCapcha from "@/components/Recapcha";
import { Metadata } from "next";

export const metadata: Metadata = {
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

export default function Home() {
  return (
    <ReCapcha />
  );
}
