"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <>{children}</>;
    }

    return (
        <div>
            <nav className="flex mx-40 mb-10 items-center justify-start">
                <Link href="/">
                    <Image
                        className="my-5"
                        src="/logo-dai-blanco.svg"
                        alt="DAI logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
            </nav>
            {children}
        </div>
    );
}
