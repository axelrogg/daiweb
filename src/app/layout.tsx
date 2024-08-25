import "./globals.css";
import { Viewport } from "next";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import font from "@/lib/config/font";

export const viewport: Viewport = {
    width: "device-width",
    height: "device-height",
    initialScale: 1.0,
    viewportFit: "cover",
};

export const metadata: Metadata = {
    title: "daiweb",
    description: "La web de la DAI",
    authors: [
        {
            name: "Axel Rodríguez Chang",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${font.className} min-h-[100svh] text-base`}>
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
