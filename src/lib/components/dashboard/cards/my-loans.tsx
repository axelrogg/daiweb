import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CircleHelpIcon } from "lucide-react";
import { MaterialLoansOverviewPanel } from "../materials/materials-loans-overview-panel";

export const MyLoans = () => (
    <Card className="flex flex-col justify-between">
        <CardHeader className="flex items-start pb-3">
            <Popover>
                <div className="mb-5 flex flex-row">
                    <CardTitle className="mr-3">Mis préstamos</CardTitle>
                    <PopoverTrigger>
                        <CircleHelpIcon className="h-6 w-6 text-primary" />
                    </PopoverTrigger>
                </div>
                <PopoverContent
                    className="z-50 w-64 rounded-lg bg-white p-6 drop-shadow-2xl lg:w-3/5"
                    sideOffset={10}
                    align="start"
                    collisionPadding={20}
                >
                    <div className="flex flex-col space-y-2">
                        <p className="mb-3 text-xl font-bold text-primary">
                            Tip
                        </p>
                        <p>Estos son tus préstamos activos</p>
                        <p>
                            Si quieres pedir algún material, haz click en{" "}
                            <span className="font-bold">Pedir materiales</span>.
                        </p>
                        <p>
                            Si quieres ver detalles de tus materiales, haz click
                            en <span className="font-bold">Ver detalles</span>.
                        </p>
                    </div>
                </PopoverContent>
            </Popover>
        </CardHeader>
        <CardContent className="pt-3">
            <MaterialLoansOverviewPanel />
        </CardContent>
    </Card>
);
