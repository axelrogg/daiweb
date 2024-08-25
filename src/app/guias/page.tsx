import { GuideInfoCard } from "@/components/guides/guide-info-card";
import { CompassIcon, PocketKnifeIcon } from "lucide-react";

export default function Guides() {
    return (
        <div className="flex min-h-[100svh] flex-col">
            <h1 className="mb-8 text-3xl font-bold">Guías</h1>
            <p>
                ¡Bienvenidos a la web de la Delegación de Alumnos de
                Industriales! En esta sección podrás encontrar información sobre
                los servicios que ofrecemos, las formas de acceder a ellos y
                mucho más.
            </p>
            <div className="my-8 space-y-8">
                <div>
                    <div className="flex flex-row items-center">
                        <CompassIcon className="mr-3 h-6 w-6 text-accent" />
                        <h3 className="text-2xl font-bold">Primeros pasos</h3>
                    </div>
                    <div className="my-4 grid grid-flow-row-dense grid-rows-1 gap-4 lg:grid-cols-2">
                        <GuideInfoCard
                            title="Cómo configurar el correo de la UVigo en tus dispositivos"
                            description="Cómo agregar el correo de la UVigo en tu ordenador y móvil."
                            href="/guias/primeros-pasos/como-configurar-el-correo-de-la-uvigo-en-tus-dispositivos"
                        />
                        <GuideInfoCard
                            title="Activar el WiFi de la UVigo en tus dispositivos"
                            description="Cómo estar siempre conectado en cualquier campus de la universidad."
                            href="/guias/primeros-pasos/activar-el-wifi-de-uvigo-en-tus-dispositivos"
                        />
                    </div>
                </div>
                <div>
                    <div className="flex flex-row items-center">
                        <PocketKnifeIcon className="mr-3 h-6 w-6 text-primary" />
                        <h3 className="text-2xl font-bold">
                            Servicios de la DAI
                        </h3>
                    </div>
                    <div className="my-4 grid grid-flow-row-dense grid-rows-2 gap-4 lg:grid-cols-2">
                        <GuideInfoCard
                            title="Cómo crear una cuenta en la DAI"
                            description="Crea una cuenta con la DAI para acceder a nuestros servicios."
                            href="/guias/servicios/como-crear-una-cuenta-en-la-dai"
                        />
                        <GuideInfoCard
                            title="Cómo solicitar una taquilla"
                            description="Cómo tener una taquilla en la EEI durante el curso 2024/25."
                            href="/guias/servicios/pedir-materiales"
                        />
                        <GuideInfoCard
                            title="Cómo solicitar materiales de la DAI"
                            description="Cómo solicitar materiales de la DAI desde tu propia cuenta."
                            href="/guias/servicios/pedir-materiales"
                        />
                        <GuideInfoCard
                            title="Cómo reservar espacios"
                            description="Cómo reservar los distintos espacios de la sede ciudad."
                            href="/guias/servicios/pedir-materiales"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
