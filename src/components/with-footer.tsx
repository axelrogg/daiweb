import { SocialMediaLinks } from "./social-media-links";
import { MainLogo } from "./main-logo";
import Link from "next/link";
import { MailIcon, PhoneIcon } from "lucide-react";

export const WithFooter = () => (
    <footer className="flex w-full flex-col items-center bg-primary px-5 py-5">
        <div className="mb-4 flex w-full flex-row px-5 lg:px-20 2xl:px-80">
            <div className="w-1/3">
                <MainLogo variant="white" scale={2} />
                <SocialMediaLinks />
                <div className="space-y-2">
                    <div className="flex flex-row items-center">
                        <Link href="tel:986812214">
                            <PhoneIcon className="h-5 w-5 text-white" />
                        </Link>
                        <p className="ml-5 text-white">986 812 214 (Campus)</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <Link href="tel:986813656">
                            <PhoneIcon className="h-5 w-5 text-white" />
                        </Link>
                        <p className="ml-5 text-white">986 813 656 (Ciudad)</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <Link href="mailto:delegacion@dai.uvigo.gal">
                            <MailIcon className="h-5 w-5 text-white" />
                        </Link>
                        <p className="ml-5 text-white">
                            delegacion@dai.uvigo.gal
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-1/3">
                <Link className="font-bold text-white mb-5" href="/guias">
                    Guías
                </Link>
                <div className="flex flex-col space-y-3">
                    <Link className="text-white" href="/guias/primeros-pasos">
                        Primeros pasos
                    </Link>
                    <Link className="text-white" href="/guias/servicios">
                        Servicios de la DAI
                    </Link>
                </div>
            </div>
            <div className="flex flex-col w-1/3">
                <p className="font-bold text-white mb-5">Normativas</p>
                <div className="flex flex-col space-y-3">

                <Link className="text-white" href="/política-de-privacidad">
                    Política de privacidad
                </Link>
                <Link className="text-white" href="/reglamento-de-pista-deportiva-peritos">
                    Reglamento de la pista deportiva de peritos
                </Link>
                </div>
            </div>
        </div>
        <p className="text-center text-sm text-white">
            &copy; 2024 Delegación de Alumnos de Industriales - Universidade de
            Vigo.
        </p>
    </footer>
);

