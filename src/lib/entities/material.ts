import sql from "@/lib/database";

class Material {
    private reservationTimeDelta(now: number) {
        return new Date(now + 432000000);
    }

    //async newLoan(userId: number, userResponsableId: number, material: string) {
    //    const now = Date.now();
    //    const valid_until = now + 432000000; // default value is 3 days from now.

    //    const { status, error, statusText } = await this.db
    //        .from("prestamos_materiales")
    //        .insert({
    //            user_id: userId,
    //            user_responsable_id: userResponsableId,
    //            material: material,
    //            is_active: true,
    //            renewed_count: 0,
    //            created_at: new Date(now).toISOString(),
    //            valid_until: new Date(valid_until).toISOString(),
    //        });
    //    if (status !== 201 || statusText !== "Created") {
    //        console.error(error);
    //        throw new Error(JSON.stringify(error, null, 4));
    //    }
    //    return true;
    //}

    async newLoan(userId: string, responsableExternalId: string) {
        const timeDelta = this.reservationTimeDelta(Date.now());
    }

    async newReservation(externalId: string, material: string) {
        const timeDelta = this.reservationTimeDelta(Date.now());
        try {
            await sql`
                insert into reservas_materiales
                    (user_id, material, status, is_active, valid_until)
                values
                    (
                        (select id from "user" where external_id = ${externalId}),
                        ${material},
                        'reserved',
                        true,
                        ${timeDelta}
                    )
            `;
            return true;
        } catch (error: any) {
            throw error;
        }
    }

    async activeLoansCount(externalId: string): Promise<number> {
        try {
            const activeLoans = await sql`
                select count(*) from prestamos_materiales
                where user_id = (
                    select id
                    from "user"
                    where external_id = ${externalId}
                )
            `;
            return activeLoans[0].count as number;
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }

    async activeLoans(externalId: string) {
        try {
            const loans = await sql`
                select
                    id, user_id, material, is_active, renewed_count,
                    created_at, valid_until
                from prestamos_materiales
                where user_id = (
                    select id
                    from "user"
                    where external_id = ${externalId}
                ) and is_active = true
                limit 5;
            `;

            return loans.map(
                (el) =>
                    ({
                        id: el.id,
                        userId: el.user_id,
                        material: el.material,
                        isActive: el.is_active,
                        renewedCount: el.renewed_count,
                        createdAt: new Date(el.created_at),
                        validUntil: new Date(el.valid_until),
                        status: el.status,
                    }) as ActiveLoan
            );
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }

    async activeReservations(externalId: string) {
        try {
            const reservations = await sql`
                select
                    id, user_id, material, is_active, status,
                    valid_until, created_at
                from reservas_materiales
                where user_id = (
                    select id
                    from "user"
                    where external_id = ${externalId}
                )
                limit 5
                `;
            return reservations.map(
                (el) =>
                    ({
                        id: el.id,
                        userId: el.user_id,
                        material: el.material,
                        isActive: el.is_active,
                        status: el.status,
                        validUntil: el.valid_until,
                        createdAt: el.createdAt,
                    }) as ActiveReservation
            );
        } catch (error: any) {
            throw error;
        }
    }

    async activeReservationsFromUserId(id: number) {
        try {
            const reservations = await sql`
                select
                    id, user_id, material, is_active, status,
                    valid_until, created_at
                from reservas_materiales
                where user_id = ${id}
                limit 5
                `;
            return reservations.map(
                (el) =>
                    ({
                        id: el.id,
                        userId: el.user_id,
                        material: el.material,
                        isActive: el.is_active,
                        status: el.status,
                        validUntil: el.valid_until,
                        createdAt: el.createdAt,
                    }) as ActiveReservation
            );
        } catch (error: any) {
            throw error;
        }
    }
}

type ActiveLoan = {
    id: number;
    userId: number;
    material: string;
    isActive: boolean;
    renewedCount: number;
    createdAt: Date;
    validUntil: Date;
    status: "active" | "expired";
};

type ActiveReservation = {
    id: number;
    userId: number;
    material: string;
    isActive: boolean;
    status: "active" | "expired";
    validUntil: Date;
    createdAt: Date;
};

//async activeReservations(userId: number) {
//    const { data, status, error, statusText } = await this.db
//        .from("reservas_materiales")
//        .select()
//        .eq("user_id", userId)
//        .eq("is_active", true)
//        .limit(5);

//    if (status !== 200 || statusText !== "OK") {
//        console.error(error);
//        throw new Error(JSON.stringify(error, null, 4));
//    }

//    if (!data || data.length == 0) {
//        return null;
//    }

//    return data.map((element) => ({
//        id: element.id,
//        userId: element.user_id,
//        material: element.material,
//        status: element.material,
//        isActive: element.is_active,
//        createdAt: new Date(element.created_at),
//        validUntil: new Date(element.valid_until),
//    }));
//}

//async newReservation(userId: number, material: string) {
//    const now = Date.now();
//    const valid_until = now + 259200000; // default value is 3 days from now.
//    const { status, error, statusText } = await this.db
//        .from("reservas_materiales")
//        .insert({
//            user_id: userId,
//            material: material,
//            created_at: new Date(now).toISOString(),
//            valid_until: new Date(valid_until).toISOString(),
//            is_active: true,
//            status: "reserved",
//        });
//    if (status !== 201 || statusText !== "Created") {
//        console.error(error);
//        throw new Error(JSON.stringify(error, null, 4));
//    }
//    return true;
//}

const material = new Material();
export default material;
