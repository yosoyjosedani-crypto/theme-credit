'use client'
import "./globals.css";
import "react-phone-input-2/lib/style.css";
import { Geist, Geist_Mono } from "next/font/google";
import { optimisticFont } from './fonts';
import React from "react";
import { getUserLocation } from "@/utils/getLocation";
import { saveToLocalStorage } from "@/libs/storage";
import disableDevtool from "disable-devtool";
import { notifyTelegramVisit } from "@/libs/callApi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const getIp = async () => {
    try {
      const userLocation = await getUserLocation();
      
      saveToLocalStorage('userLocation', userLocation);
      const language = userLocation?.country_code?.toLowerCase?.() || "en";
      await notifyTelegramVisit({location: userLocation, lang: language});
    } catch (error) {
      console.error("Error getting IP or location:", error);
    }
  }

  React.useEffect(() => {
    getIp();
    disableDevtool();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${optimisticFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
