import { WithHead } from "@/components/with-head";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
            <WithHead />
            <body className={`${inter.className} text-base`}>{children}</body>
        </html>
    );
}
