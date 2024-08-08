import { GuideInfoCard } from "@/components/guide-info-card";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Guides() {
    return (
        <>
            <h1 className="mb-8 text-3xl font-bold">Guías</h1>
            <p>
                ¡Bienvenidos a la web de la Delegación de Alumnos de
                Industriales! En esta sección podrás encontrar información sobre
                los servicios que ofrecemos, las formas de acceder a ellos y
                mucho más.
            </p>
            <div className="my-4 grid grid-flow-col grid-rows-3 gap-4">
                <GuideInfoCard
                    title="Añadir el correo electrónico de la UVigo"
                    description="Cómo añadir el correo alumnos.uvigo.es a tu ordenador y móvil."
                    href="/guias/anadir-correo-uvigo"
                >
                    <ArrowRightIcon className="h-6 w-6 " />
                </GuideInfoCard>
                <GuideInfoCard
                    title="Activar el WiFi de la UVigo"
                    description="Cómo estar siempre conectado en cualquier campus de la universidad"
                    href="/guias/activar-wifi"
                >
                    <ArrowRightIcon className="h-6 w-6 " />
                </GuideInfoCard>
            </div>
        </>
    );
}
