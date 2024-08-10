"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { newMaterialReservation } from "@/lib/actions/new-material-reservation";
import { ToastAction } from "@/components/ui/toast";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { userActiveLoansCount } from "@/lib/actions/user-active-loans-count";

export const BorrowMaterialForm = () => {
    const { toast } = useToast();
    const [showOtros, setShowOtros] = useState(false);
    const [enableSubmitButton, setEnableSubmitButton] = useState(false);
    const [canBorrowMaterial, setCanBorrowMaterial] = useState(true);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otros: "",
            material: undefined,
        },
    });

    useEffect(() => {
        async function activeLoansCount() {
            const count = await userActiveLoansCount();
            if (!count) {
                return;
            }
            if (count >= 5) {
                setCanBorrowMaterial(false);
            }
        }
        activeLoansCount();
    }, []);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        const material =
            data.material === "Otros" ? data.otros! : data.material;
        await newMaterialReservation(material);
        toast({
            title: "¡Todo listo!",
            description:
                "Solo queda que muestres tu código QR a un miembro de la DAI.",
            action: (
                <ToastAction altText="Mostrar mi QR" asChild>
                    <Link href="/dashboard/mi-codigo-qr">Mostrar mi QR</Link>
                </ToastAction>
            ),
        });
    }

    function onMaterialValueChange(material: string) {
        if (material === "Otros") {
            setShowOtros(true);
            setEnableSubmitButton(false);
        } else {
            form.setValue("material", "");
            setShowOtros(false);
            setEnableSubmitButton(true);
        }
        form.setValue("material", material);
    }

    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="material"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Material</FormLabel>
                                <Select
                                    defaultValue={field.value}
                                    disabled={field.disabled}
                                    onValueChange={(material) =>
                                        onMaterialValueChange(material)
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el material que quieres" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {materialNameList.map((name, idx) => (
                                            <SelectItem key={idx} value={name}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Elige lo que quieras. Recuerda que solo
                                    puedes tener 5 materiales en préstamo a la
                                    vez.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {showOtros && (
                        <FormField
                            control={form.control}
                            name="otros"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Otro material</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Escribe el nombre del material"
                                            defaultValue={field.value}
                                            disabled={field.disabled}
                                            onChange={(material) => {
                                                if (
                                                    material.target.value
                                                        ?.length
                                                ) {
                                                    setEnableSubmitButton(true);
                                                    console.log(
                                                        material.target.value
                                                    );
                                                } else {
                                                    setEnableSubmitButton(
                                                        false
                                                    );
                                                }
                                                form.setValue(
                                                    "otros",
                                                    material.target.value
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Escribe el material si no encuentras lo
                                        que quieres en la lista anterior.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <div className="flex justify-between">
                        <Button
                            type="submit"
                            disabled={!enableSubmitButton || !canBorrowMaterial}
                        >
                            Pedir ahora
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

const materialNameList = [
    "Alargador",
    "Auriculares",
    "Batas",
    "Cable cargador",
    "Calculadora",
    "Calibre",
    "Camara",
    "Cargador",
    "Cartabón",
    "Celo",
    "Compás",
    "Cutter",
    "Escuadra",
    "Lector DNI",
    "Mando de presentaciones",
    "Multímetro",
    "Pegamento",
    "Portátil",
    "Ratón",
    "Regla",
    "Regleta",
    "Rotulador permanente",
    "Subrayador",
    "Tijera",
    "Tipp-ex",
    "Transportador de ángulos",
    "Otros",
];

const FormSchema = z
    .object({
        material: z.string({
            required_error: "Por favor, selecciona un material",
        }),
        otros: z.string().optional(),
    })
    .refine(
        (data) =>
            (data.material === "Otros" &&
                typeof data.otros === "string" &&
                data.otros?.trim().length > 0) ||
            data.material !== "Otros",
        {
            message: "Por favor, asegúrate de llenar la cajita de 'Otros'",
            path: ["otros"],
        }
    );
