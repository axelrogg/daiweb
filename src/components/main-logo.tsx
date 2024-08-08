import Image from "next/image";
import Link from "next/link";

export const MainLogo = () => (
    <Link href="/">
        <Image
            src="/logo-dai.svg"
            alt="DAI logo"
            width={40}
            height={40}
            priority
        />
    </Link>
);
