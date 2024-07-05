"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";

export const MaterialBorrowingForm = () => {
    const [showOtros, setShowOtros] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otros: "",
            material: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // more on this later
        console.info(data);
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
                                    onValueChange={(material) => {
                                        if (material === "Otros") {
                                            setShowOtros(true);
                                        } else if (
                                            material !== "Otros" &&
                                            showOtros === true
                                        ) {
                                            setShowOtros(!showOtros);
                                        }
                                        form.setValue("material", material);
                                    }}
                                    defaultValue={field.value}
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
                                    puedes tener 5 artículos a la vez.
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
                                            {...field}
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

                    <Button type="submit">Reservar</Button>
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
