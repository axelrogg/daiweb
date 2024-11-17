import { Tailwind } from "@react-email/tailwind";

interface WelcomeToDAITemplateProps {
    name: string;
}

const DAI_BASE_URL = "https://dai.uvigo.gal";

export const WelcomeToDAITemplate: React.FC<
    Readonly<WelcomeToDAITemplateProps>
> = ({ name }) => (
    <Tailwind>
        <div className="my-4 h-full w-full space-y-8 bg-line-in-motion text-center">
            <div>
                <h1 className="text-3xl font-bold">
                    ¡La DAI te da la bienvenida!
                </h1>
                <a
                    className="mt-8 flex items-center justify-center"
                    href="https://dai.uvigo.gal"
                >
                    <img
                        src={`${DAI_BASE_URL}/assets/email/dai-logo-color.png`}
                        alt="Logo de la DAI"
                        width={80}
                        height={62}
                    />
                </a>
            </div>
            <div className="space-y-5">
                <p>
                    Hola {name}, gracias por unirte a la Delegación de Alumnos
                    de Industriales.
                </p>
                <p>
                    Con tu cuenta podrás disfrutar de beneficios como préstamo
                    de materiales, reserva de taquillas durante todo el curso y
                    mucho más.
                </p>
            </div>
            <div className="my-5 flex w-full flex-row items-center justify-center">
                <a href="https://instagram.com/dai_uvigo" className="mr-7">
                    <img
                        src={`${DAI_BASE_URL}/assets/email/instagram-logo-black.png`}
                        alt="Instagram logo. Haz click para acceder al instagram de la DAI"
                        width={20}
                        height={20}
                    />
                </a>
                <a href="https://x.com/DAIndustriais" className="mr-7">
                    <img
                        src={`${DAI_BASE_URL}/assets/email/x-logo-black.png`}
                        alt="X logo. Haz click para acceder a la página de X de la DAI"
                        width={20}
                        height={20}
                    />
                </a>
                <a href="https://github.com/axelrogg/daiweb">
                    <img
                        src={`${DAI_BASE_URL}/assets/email/github-logo-black.png`}
                        alt="Github logo. Haz click para acceder al repositorio de Github de la web"
                        width={20}
                        height={20}
                    />
                </a>
            </div>
        </div>
    </Tailwind>
);
