import { BorrowMaterialForm } from "@/components/dashboard/materials/borrow-material-form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CircleHelpIcon } from "lucide-react";

export default function Page() {
    return (
        <>
            <Popover>
                <div className="mb-5 flex flex-row">
                    <h1 className="mr-3 flex text-3xl font-bold">
                        Préstamo de materiales
                    </h1>
                    <PopoverTrigger>
                        <CircleHelpIcon className="text-primary h-6 w-6" />
                    </PopoverTrigger>
                </div>
                <PopoverContent
                    className="z-50 w-64 rounded-lg bg-white p-6 drop-shadow-2xl lg:w-3/5"
                    sideOffset={10}
                    align="start"
                    collisionPadding={20}
                >
                    <div className="flex flex-col space-y-2">
                        <p className="text-primary mb-3 text-xl font-bold">
                            Tip
                        </p>
                        <p>
                            En este página puedes pedir el material que quieras.
                        </p>
                        <p>
                            Si el botón{" "}
                            <span className="font-bold">Pedir material</span>{" "}
                            está deshabilitado, es porque tienes 5 materiales en
                            préstamo en ese momento. En ese caso, tienes que
                            devolver algún material antes de pedir otro.
                        </p>
                    </div>
                </PopoverContent>
            </Popover>
            <BorrowMaterialForm />
        </>
    );
}
