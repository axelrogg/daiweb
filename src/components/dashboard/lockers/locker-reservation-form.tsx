"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { availableLockersAction } from "@/lib/actions/lockers/available-lockers";
import { assignNewLocker } from "@/lib/actions/lockers/assign-new-locker";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const campusOptions = ["CUVI", "Ciudad"];

const FormSchema = z.object({
    campus: z
        .string({
            required_error: "Por favor, selecciona el campus.",
        })
        .min(1, "Por favor, selecciona el campus."),
    numero: z
        .string({
            required_error: "Por favor, ingresa el número de taquilla",
        })
        .min(1, "Por favor, ingresa el número de taquilla")
        .refine((lockerNumber) => !Number.isNaN(Number(lockerNumber)), {
            message: "Solo puedes ingresar números enteros mayores a 0.",
        }),
});

export const LockerReservationForm = () => {
    const { toast } = useToast();

    const [availableLockers, setAvailableLockers] = useState<
        {
            campus: "cuvi" | "ciudad";
            number: string;
            isAvailable: boolean;
        }[]
    >([]);
    const [lockerNumber, setLockerNumber] = useState("");
    const [lockerNumberIsValid, setLockerNumberIsValid] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            campus: "",
            numero: "",
        },
    });

    useEffect(() => {
        async function fetchAvailableLockers() {
            const lockers = await availableLockersAction();
            if (!lockers) {
                return;
            }
            setAvailableLockers(lockers);
        }
        fetchAvailableLockers();
    }, []);

    function isValidLocker(campus: "ciudad" | "cuvi", lockerNumber: string) {
        return availableLockers.some(
            (obj) =>
                obj.number === lockerNumber &&
                obj.campus === campus.toLowerCase()
        );
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!isValidLocker(data.campus as "cuvi" | "ciudad", data.numero)) {
            form.setError("numero", {
                message:
                    "Taquilla no disponible o no existe. Prueba el botón 'Asignar taquilla aleatoriamente'.",
            });
            return;
        }

        try {
            await assignNewLocker(
                data.campus.toLowerCase() as "cuvi" | "ciudad",
                Number(data.numero)
            );
            toast({
                title: "¡Yuhu! Ya tienes tu nueva taquilla",
                description:
                    "A partir de ahora y hasta que finalice el curso puedes utilizar tu nueva taquilla.",
                action: (
                    <ToastAction altText="Volver al dashboard" asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </ToastAction>
                ),
            });
            return;
        } catch (error: any) {
            if (
                error.message.includes(
                    "One user cannot have multiple lockers assigned to themselves"
                )
            ) {
                toast({
                    variant: "destructive",
                    title: "No podemos asignarte más de una taquilla",
                    description:
                        "Solo se puede tener una taquilla por persona.",
                });
                return;
            }
            if (
                error.message.includes(
                    "The same locker cannot be assigned to more than one user"
                )
            ) {
                toast({
                    variant: "destructive",
                    title: "Esta taquilla ya está asignada",
                    description:
                        "La taquilla que escogiste ya fue asignada a alguien más. Por favor, escoge otra.",
                });
                return;
            }
            toast({
                variant: "destructive",
                title: "Ocurrió un error",
                description:
                    "Tuvimos un error y no pudimos asignar tu taquilla. Prueba más tarde. Si el problema persiste contacta con algún miembro de la DAI",
            });
        }
    }

    function onClickRandomLockerGenerator() {
        form.clearErrors("numero");
        if (form.getValues("campus").length === 0) {
            form.setError("numero", {
                message:
                    "Antes de generar una taquilla debes selecciona un campus",
            });
            return;
        }
        const campusLockers = availableLockers.filter(
            (obj) => obj.campus === form.getValues("campus").toLowerCase()
        );
        const randomLockerNumber =
            campusLockers[Math.floor(Math.random() * campusLockers.length)]
                .number;

        setLockerNumber(randomLockerNumber);
        form.setValue("numero", randomLockerNumber);
        setLockerNumberIsValid(true);
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="campus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Campus</FormLabel>
                                <Select
                                    value={field.value}
                                    disabled={field.disabled}
                                    onValueChange={(selected) => {
                                        form.setValue("campus", selected);
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el campus" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {campusOptions.map((name, idx) => (
                                            <SelectItem key={idx} value={name}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    El campus en donde estudias.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="numero"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de taquilla</FormLabel>
                                <FormControl>
                                    <div className="flex flex-row space-x-3">
                                        <Input
                                            className="w-1/4"
                                            placeholder="Escribe el número de taquilla"
                                            disabled={field.disabled}
                                            value={lockerNumber}
                                            onChange={(input) => {
                                                const lockerValue =
                                                    input.target.value;
                                                setLockerNumber(lockerValue);
                                                setLockerNumberIsValid(
                                                    isValidLocker(
                                                        form
                                                            .getValues("campus")
                                                            .toLowerCase() as
                                                            | "ciudad"
                                                            | "cuvi",
                                                        lockerValue
                                                    )
                                                );

                                                form.setValue(
                                                    "numero",
                                                    lockerValue
                                                );
                                                if (
                                                    !lockerNumberIsValid &&
                                                    lockerValue.length > 0 &&
                                                    !isNaN(Number(lockerValue))
                                                ) {
                                                    form.setError("numero", {
                                                        message:
                                                            "Taquilla no disponible o no existe. Prueba el botón 'Asignar taquilla aleatoriamente'.",
                                                    });
                                                } else {
                                                    form.clearErrors("numero");
                                                }
                                            }}
                                        />
                                        {lockerNumber.length > 0 && (
                                            <div className="flex items-center justify-center">
                                                {lockerNumberIsValid ? (
                                                    <CircleCheckIcon className="h-5 w-5 text-green-900" />
                                                ) : (
                                                    <CircleXIcon className="h-5 w-5 text-red-900" />
                                                )}
                                            </div>
                                        )}
                                        <Button
                                            onClick={
                                                onClickRandomLockerGenerator
                                            }
                                            type="button"
                                        >
                                            Asignar taquilla aleatoriamente
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Si sabes el número de taquilla que quieres,
                                    escríbelo
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between">
                        <Button type="submit">Solicitar taquilla</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
