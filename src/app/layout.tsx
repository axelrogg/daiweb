import "./globals.css";
import { Viewport } from "next";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import fontConfig from "@/config/font";
import clerkConfig from "@/config/clerk";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
}

export const metadata: Metadata = {
    title: "daiweb",
    description: "La web de la DAI",
    authors: [
        {
            name: "Axel Rodríguez Chang",
        },
        {
            name: "Manuel Medina Rodríguez",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            localization={clerkConfig.localization}
            appearance={clerkConfig.appeareance}
        >
            <html lang="en">
                <body className={`${fontConfig.className} text-base`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
