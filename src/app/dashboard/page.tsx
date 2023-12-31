"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQRCode } from "next-qrcode";
import { IoIosWarning } from "react-icons/io";

const transactions = [
    {
        transaction_id: 1,
        borrower_id: 101,
        item_id: 201,
        staff_id: 301,
        transaction_type: "Borrow",
        transaction_timestamp: "2023-01-15T10:30:00Z",
        expected_return_date: "2023-02-01T10:30:00Z",
        actual_return_date: null,
    },
    {
        transaction_id: 2,
        borrower_id: 102,
        item_id: 202,
        staff_id: 302,
        transaction_type: "Return",
        transaction_timestamp: "2023-02-20T14:45:00Z",
        expected_return_date: "2023-02-25T14:45:00Z",
        actual_return_date: "2023-02-23T14:45:00Z",
    },
    {
        transaction_id: 3,
        borrower_id: 103,
        item_id: 203,
        staff_id: 303,
        transaction_type: "Borrow",
        transaction_timestamp: "2023-03-10T09:15:00Z",
        expected_return_date: "2023-03-20T09:15:00Z",
        actual_return_date: null,
    },
];

function dateToDMY(date: Date) {
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
}

export default function Dashboard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { SVG } = useQRCode();
    const router = useRouter();

    const [showQRCode, setShowQRCode] = useState(false);
    const [showBorrowedItems, setShowBorrowedItems] = useState(false);
    const [showStudentNotVerifiedWarning, setShowStudentNotVerifiedWarning] =
        useState(false);

    if (!isLoaded) {
        return;
    }

    if (!isSignedIn) {
        router.replace("/auth/sign-in");
    }

    const userIdSuffix = user?.id.slice("user_".length);

    function onClickShowQRCode() {
        if (showBorrowedItems) {
            setShowBorrowedItems(false);
        }
        if (showStudentNotVerifiedWarning) {
            setShowStudentNotVerifiedWarning(false);
        }
        // TODO: Will need to parse public metadata in the future ?
        if (user?.publicMetadata.studentVerified === "false") {
            setShowStudentNotVerifiedWarning(true);
        }
        setShowQRCode(!showQRCode);
    }

    function onClickShowBorrowedItems() {
        if (showQRCode) {
            setShowQRCode(false);
        }
        setShowBorrowedItems(!showBorrowedItems);
    }

    return (
        <div className="mx-40">
            <div>
                {user?.firstName ? (
                    <h1 className="text-4xl font-bold">
                        ¡Hola {user?.firstName}!
                    </h1>
                ) : (
                    <h1 className="text-4xl font-bold">¡Hola!</h1>
                )}
            </div>
            <div className="flex justify-center">
                <div className="flex flex-row my-4 items-center justify-between">
                    <button
                        className="bg-black rounded-lg p-2 m-4"
                        onClick={onClickShowQRCode}
                    >
                        Ver mi código QR
                    </button>
                    <button
                        className="bg-black rounded-lg p-2 m-4"
                        onClick={onClickShowBorrowedItems}
                    >
                        Ver mis préstamos
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                {showQRCode && showStudentNotVerifiedWarning && (
                    <div className="flex flex-col justify-center p-8 rounded-lg">
                        <div className="flex flex-row items-center mb-4">
                            <IoIosWarning
                                size={32}
                                style={{ color: "#fa6b6b", marginRight: 4 }}
                            />
                            <p className="text-[#fa6b6b] text-2xl font-bold">
                                ¡Ups!
                            </p>
                        </div>
                        <p className="mb-4 text-black">
                            Parece que tu código QR no está habilitado.
                        </p>
                        <button className="bg-black p-2 rounded-lg">
                            Cómo habilitar mi código QR
                        </button>
                    </div>
                )}
                {showQRCode && !showStudentNotVerifiedWarning && (
                    <div className="flex flex-col justify-center items-center">
                        <div className="my-4">
                            <SVG
                                text={userIdSuffix!}
                                options={{
                                    margin: 2,
                                    width: 200,
                                    color: {
                                        dark: "#010599FF",
                                        light: "#FFBF60FF",
                                    },
                                }}
                            />
                        </div>
                        <p>
                            Muestra este código en la oficina de la DAI para
                            solicitar algún préstamo.
                        </p>
                        <Link
                            href="/docs"
                            className="bg-black p-2 my-4 rounded-lg"
                        >
                            Más información
                        </Link>
                    </div>
                )}
                {showBorrowedItems && (
                    <div className="flex flex-col">
                        <p>
                            Mock data!!!!!!!!!!!!!!!!!
                        </p>

                        <table className="table-auto border-collapse my-4">
                            <thead>
                                <tr className="flex items-center border-b border-grey">
                                    <th className="flex w-52 justify-start">
                                        Nombre
                                    </th>
                                    <th className="flex w-52 justify-start">
                                        Fecha de préstamo
                                    </th>
                                    <th className="flex w-52 justify-start">
                                        Fecha de entrega
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((value, indx) => (
                                    <tr
                                        key={indx}
                                        className="flex items-center border-b border-grey"
                                    >
                                        <td className="flex w-52 justify-start">
                                            {value.item_id}
                                        </td>
                                        <td className="flex w-52 justify-start">
                                            {dateToDMY(
                                                new Date(
                                                    value.transaction_timestamp
                                                )
                                            )}
                                        </td>
                                        <td className="flex w-52 justify-start">
                                            {dateToDMY(
                                                new Date(
                                                    value.expected_return_date
                                                )
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
