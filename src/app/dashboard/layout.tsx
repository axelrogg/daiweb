import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav className="flex mx-40 mb-10 items-center justify-between border-b border-grey">
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
                <UserButton afterSignOutUrl="/" />
            </nav>
            {children}
        </div>
    );
}
