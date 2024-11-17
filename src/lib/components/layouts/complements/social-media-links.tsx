import Link from "next/link";
import Image from "next/image";

export const SocialMediaLinks = () => (
    <div className="my-5 flex flex-row items-center space-x-7">
        <Link href="https://instagram.com/dai_uvigo">
            <Image
                src="/assets/social-media-apps-logos/instagram-logo.svg"
                alt="Instagram logo. Haz click para acceder al instagram de la DAI"
                width={20}
                height={20}
            />
        </Link>
        <Link href="https://x.com/DAIndustriais">
            <Image
                src="/assets/social-media-apps-logos/x-logo.svg"
                alt="X logo. Haz click para acceder a la página de X de la DAI"
                width={20}
                height={20}
            />
        </Link>
        <Link href="https://github.com/axelrogg/daiweb">
            <Image
                src="/assets/social-media-apps-logos/github-logo.svg"
                alt="Github logo. Haz click para acceder al repositorio de Github de la web"
                width={20}
                height={20}
            />
        </Link>
    </div>
);
