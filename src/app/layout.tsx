import { ClerkProvider } from "@clerk/nextjs";
import { WithHead } from "@/components/with-head";
import "./globals.css";
import type { Metadata } from "next";
import fontConfig from "@/config/font";
import clerkConfig from "@/config/clerk";

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
                <WithHead />
                <body className={`${fontConfig.className} text-base`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
