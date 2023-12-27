import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: "Delegación de Alumnos de la Escuela de Ingeniería Industrial",
    // TODO: Add description
    // description: '',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider afterSignInUrl="/dashboard">
            <html lang="es">
                <body
                    className={`${inter.className} text-sm bg-[#1B669A] text-white`}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
