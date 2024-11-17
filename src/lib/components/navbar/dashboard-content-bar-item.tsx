import { ReactElement } from "react";
import { KeyboardIcon, PencilRulerIcon, QrCodeIcon } from "lucide-react";

interface DashboardContentBarItem {
    title: string;
    href: string;
    children?: DashboardContentBarItem[];
    icon?: ReactElement;
}

export const dashboardContentBarItems: DashboardContentBarItem[] = [
    {
        title: "Panel de staff",
        href: "/dashboard/staff-panel",
        icon: <KeyboardIcon className="mr-3 h-4 w-4 stroke-amber-800" />,
    },
    {
        title: "Ver mi QR",
        href: "/dashboard/mi-codigo-qr",
        icon: <QrCodeIcon className="mr-3 h-4 w-4 stroke-primary" />,
    },
    {
        title: "Materiales",
        href: "/dashboard/materiales/mis-prestamos",
        icon: <PencilRulerIcon className="mr-3 h-4 w-4 stroke-green-800" />,
        children: [
            {
                title: "Mis préstamos",
                href: "/dashboard/materiales/mis-prestamos",
            },
            {
                title: "Pedir materiales",
                href: "/dashboard/materiales/pedir-material",
            },
        ],
    },
];
