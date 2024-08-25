import Image from "next/image";
import Link from "next/link";

export const MainLogo = ({ variant, scale }: MainLogoProps) => (
    <Link href="/" className="w-[80px]">
        <Image
            src={
                variant === "white"
                    ? "/dai-logo-white.svg"
                    : "/dai-logo-color.svg"
            }
            alt="DAI logo"
            width={scale ? 40 * scale : 40}
            height={scale ? 31 * scale : 31}
            priority
        />
    </Link>
);

interface MainLogoProps {
    variant?: "color" | "white" | null | undefined;
    scale?: number;
}
