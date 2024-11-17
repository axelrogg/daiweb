import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const MainLogo = ({ variant, scale, className }: MainLogoProps) => (
    <Link
        href="/"
        className={cn("flex w-[80px] items-center justify-center", className)}
    >
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
    className?: string | undefined | null;
}
