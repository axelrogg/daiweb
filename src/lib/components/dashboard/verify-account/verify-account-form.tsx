"use client";

import { LoadingSpinner } from "@components/loading-spinner";
import { Button } from "@components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { ToastAction } from "@components/ui/toast";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const VerifyAccountForm = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: "",
            fullName: "",
            file: new File([], ""),
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData();
        formData.append("student_id", data.id);
        formData.append("full_name", data.fullName);
        formData.append("sign_up_sheet", data.file);
        try {
            setLoading(true);
            const response = await fetch("/api/users/verify", {
                method: "POST",
                body: formData,
            });
            setLoading(false);
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "No pudimos verificar tu cuenta.",
                    description:
                        "Asegúrate de que tus datos coinciden con el PDF de tu " +
                        "matrícula. Si crees que son correctos, contáctanos para " +
                        "una verificación manual.",
                });
                return;
            }

            toast({
                title: "¡Yuhu! Tu cuenta ha sido verificada",
                description:
                    "Puedes disfrutar de todos los beneficios de nuestra web. " +
                    "Vuelve a tu dashboard para ver los cambios.",
                action: (
                    <ToastAction altText="Volver al dashboard" asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </ToastAction>
                ),
            });
            return;
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Ocurrió un error",
                description:
                    "Tuvimos un error y no pudimos verificar tu cuenta. Prueba más tarde. Si el problema persiste contacta con algún miembro de la DAI",
            });
        }
    }
    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                >
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre(s) y apellidos</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Escribe tu nombre completo"
                                        name={field.name}
                                        value={field.value}
                                        onChange={(el) => {
                                            form.setValue(
                                                "fullName",
                                                el.target.value
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Escribe tu nombre completo tal y como
                                    aparece en tu matrícula
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>DNI/NIE/Pasaporte</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Escribe tu DNI, NIE o pasaporte"
                                        onChange={(el) => {
                                            form.setValue(
                                                "id",
                                                el.target.value
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Escribe el documento con el que te
                                    matriculaste
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="file"
                        render={() => (
                            <FormItem>
                                <FormLabel>Matrícula</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(el) => {
                                            if (!el.target.files) {
                                                return;
                                            }
                                            form.setValue(
                                                "file",
                                                el.target.files[0]
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Sube el PDF del impreso tu matrícula. Si
                                    necesitas ayuda para encontrarlo, revisa la
                                    guía sobre la{" "}
                                    <Link
                                        href="/guias/servicios/como-crear-una-cuenta-en-la-dai#paso-2-verifica-tu-cuenta"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline hover:text-accent"
                                    >
                                        verificación de cuentas
                                    </Link>
                                    .
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="mt-4"
                        disabled={loading ? true : false}
                    >
                        {loading ? <LoadingSpinner /> : <p>Submit</p>}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

const MAX_FILE_SIZE = 1024 * 50; // 50kB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const FormSchema = z.object({
    file: z
        .instanceof(File, {
            message: "Debes subir un archivo de matrícula.",
        })
        .refine((file) => {
            return ACCEPTED_FILE_TYPES.includes(file.type);
        }, "El formato del archivo no es válido. Solo puedes subir PDFs.")
        .refine((file) => {
            return file.size <= MAX_FILE_SIZE;
        }, "El archivo debe pesar menos de 50 kB."),
    fullName: z
        .string({
            required_error: "Debes escribir tu nombre para verificarte.",
        })
        .min(1, {
            message: "Debes escribir tu nombre para verificarte.",
        }),
    id: z
        .string({
            required_error:
                "Debes escribir tu DNI/NIE/Pasaporte para verificarte.",
        })
        .min(1, {
            message: "Debes escribir tu DNI/NIE/Pasaporte para verificarte.",
        }),
});
