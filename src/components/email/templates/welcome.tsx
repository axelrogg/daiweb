import { Tailwind } from "@react-email/tailwind";

interface EmailTemplateProps {
    firstName: string;
}

const DAI_BASE_URL = "https://dai.uvigo.gal";

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
}) => (
    <Tailwind>
        <div className="h-[400px] w-[700px] space-y-8 bg-white p-4 text-center">
            <div>
                <h1 className="text-3xl font-bold">
                    ¡La DAI te da la bienvenida!
                </h1>
                <img
                    src={`${DAI_BASE_URL}/assets/email/dai-logo-color.png`}
                    alt="Logo de la DAI"
                    width={80}
                    height={62}
                />
            </div>
            <div className="space-y-5">
                <p>
                    Hola {firstName}, gracias por unirte a la Delegación de
                    Alumnos de Industriales
                </p>
                <p>
                    Con tu cuenta podrás disfrutar de beneficios como préstamo
                    de materiales, reserva de taquillas durante todo el curso y
                    mucho más.
                </p>
            </div>
            <div className="my-5 flex flex-row items-center space-x-7">
                <a href="https://instagram.com/dai_uvigo">
                    <img
                        src={`${DAI_BASE_URL}/assets/email/instagram-logo_black.png`}
                        alt="Instagram logo. Haz click para acceder al instagram de la DAI"
                        width={20}
                        height={20}
                    />
                </a>
                <a href="https://x.com/DAIndustriais">
                    <img
                        src={`${DAI_BASE_URL}/assets/email/x-logo_black.png`}
                        alt="X logo. Haz click para acceder a la página de X de la DAI"
                        width={20}
                        height={20}
                    />
                </a>
                <a href="https://github.com/axelrogg/daiweb">
                    <img
                        src={`${DAI_BASE_URL}/assets/email/github-logo_black.png`}
                        alt="Github logo. Haz click para acceder al repositorio de Github de la web"
                        width={20}
                        height={20}
                    />
                </a>
            </div>
        </div>
    </Tailwind>
);
