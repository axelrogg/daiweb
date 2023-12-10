import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const lexend = Lexend({ subsets: ["latin"] });

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
        <ClerkProvider>
            <html lang="es">
                <body className={lexend.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
