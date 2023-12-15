import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen items-center">
            <nav className="flex w-full justify-around items-center justify-start p-8">
                <Link href="/">
                    <Image
                        src="/logo-dai-blanco.svg"
                        alt="DAI logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
                <div className="flex">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </nav>
            {children}
        </div>
    );
}
