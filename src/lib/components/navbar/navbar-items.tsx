import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { CalendarCheckIcon, KeyRoundIcon } from "lucide-react";
import { ReactElement } from "react";

export const navBarItems: NavBarItem[] = [
    {
        title: "Guías",
        href: "/guias",
        icon: <DocumentTextIcon className="mr-2 h-6 w-6 stroke-purple-800" />,
    },
    {
        title: "Solicita una taquilla",
        href: "/guias/servicios/como-solicitar-una-taquilla",
        icon: <KeyRoundIcon className="mr-2 h-6 w-6 stroke-blue-800" />,
    },
    {
        title: "Reserva de espacios",
        href: "/guias/servicios/como-reservar-espacios",
        icon: <CalendarCheckIcon className="mr-2 h-6 w-6 stroke-green-800" />,
    },
];

interface NavBarItem {
    title: string;
    href: string;
    icon?: ReactElement;
}
