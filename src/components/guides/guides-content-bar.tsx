"use client";

import { CompassIcon, FileTextIcon, PocketKnifeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

const guideContentBarItems: GuideContentBarItem[] = [
    {
        title: "Primeros pasos",
        href: "/guias/primeros-pasos",
        isParent: true,
        icon: <CompassIcon className="mr-3 h-4 w-4 text-accent" />,
        children: [
            {
                title: "Cómo configurar el correo de la UVigo en tus dispositivos",
                href: "/guias/primeros-pasos/como-configurar-el-correo-de-la-uvigo-en-tus-dispositivos",
            },
            {
                title: "Activar el WiFi de UVigo en tus dispositivos",
                href: "/guias/primeros-pasos/activar-el-wifi-de-uvigo-en-tus-dispositivos",
            },
        ],
    },
    {
        title: "Servicios de la DAI",
        href: "/guias/servicios",
        isParent: true,
        icon: <PocketKnifeIcon className="mr-3 h-4 w-4 text-primary" />,
        children: [
            {
                title: "Cómo crear una cuenta en la DAI",
                href: "/guias/servicios/como-crear-una-cuenta-en-la-dai",
            },
            {
                title: "Cómo solicitar una taquilla",
                href: "/guias/servicios/como-solicitar-una-taquilla",
            },
            {
                title: "Cómo acceder a materiales de la DAI",
                href: "/guias/servicios/como-acceder-a-materiales-de-la-dai",
            },
            {
                title: "Cómo reservar espacios",
                href: "/guias/servicios/como-reservar-espacios",
            },
        ],
    },
];

interface GuideContentBarItem {
    title: string;
    href: string;
    isParent?: boolean | undefined | null;
    children?: GuideContentBarItem[];
    icon?: ReactElement;
}

export const GuidesContentBar = () => {
    const pathName = usePathname();
    return (
        <>
            <Link href="/guias">
                <div className="my-1 flex flex-row items-center rounded-lg px-2 py-2 hover:bg-slate-100">
                    <FileTextIcon className="mr-3 h-4 w-4 text-accent" />
                    <p className={pathName === "/guias" ? "font-bold" : ""}>
                        Guías
                    </p>
                </div>
            </Link>
            {guideContentBarItems.map((item, idx) => {
                const boldifyParent = pathName.includes(item.href);
                return (
                    <div key={idx}>
                        {item.icon && (
                            <Link href={item.href}>
                                <div className="my-2 flex flex-row items-center rounded-lg px-2 py-2 hover:bg-slate-100">
                                    {item.icon}
                                    <p
                                        className={
                                            boldifyParent ? "font-bold" : ""
                                        }
                                    >
                                        {item.title}
                                    </p>
                                </div>
                            </Link>
                        )}
                        {item.children && (
                            <div className="space-y-2">
                                {item.children.map((child, index) => {
                                    const boldifyChild =
                                        pathName === child.href;
                                    return (
                                        <div
                                            key={`${index}-${child.href}`}
                                            className={`ml-7 rounded-r-lg border-l-2 px-1 py-2 hover:border-l-2 hover:border-l-accent hover:bg-slate-100 ${boldifyChild ? "border-l-primary" : ""}`}
                                        >
                                            <Link href={child.href}>
                                                <p
                                                    className={`ml-4 ${boldifyChild ? "font-bold" : ""}`}
                                                >
                                                    {child.title}
                                                </p>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};
