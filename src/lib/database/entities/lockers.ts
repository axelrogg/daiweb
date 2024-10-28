import sql from "@/lib/database/psql";

class Locker {
    async userLockerFromForm(email: string) {
        try {
            const locker = await sql<
                {
                    number: number;
                    campus: "cuvi" | "ciudad";
                    email: string;
                }[]
            >`
                select
                    number, campus, email
                from
                    locker_form_table
                where
                    email = ${email}
                `;
            if (locker.length === 0) {
                return null;
            }
            return locker[0];
        } catch (error: any) {
            throw error;
        }
    }

    async userLocker(userId: number) {
        try {
            const lockerInfo = await sql<
                {
                    school_locker_number: number;
                    school_locker_campus: string;
                    zone: string;
                }[]
            >`
                select
                    usl.school_locker_number,
                    usl.school_locker_campus,
                    sl.zone
                from
                    user_school_lockers usl
                inner join
                    school_lockers sl
                on
                    usl.school_locker_number = sl.number
                    AND usl.school_locker_campus = sl.campus
                where
                    usl.user_id = ${userId};
            `;
            if (lockerInfo.length === 0) {
                return null;
            }
            return {
                campus: lockerInfo[0].school_locker_campus,
                number: lockerInfo[0].school_locker_number,
                zone: lockerInfo[0].zone,
            };
        } catch (error: any) {
            throw error;
        }
    }

    async availableLockers() {
        try {
            const lockers = await sql`
                select
                    campus, number, zone, is_available
                from
                    school_lockers
                where
                    is_available = true
            `;
            return lockers.map(
                (el) =>
                    ({
                        campus: el.campus,
                        number: el.number.toString(),
                        isAvailable: el.is_available,
                    }) as {
                        campus: "cuvi" | "ciudad";
                        number: string;
                        isAvailable: boolean;
                    }
            );
        } catch (error: any) {
            throw error;
        }
    }

    async assignNewLocker(
        userId: number,
        campus: "cuvi" | "ciudad",
        number: number
    ) {
        try {
            await sql.begin(async (sql) => {
                await sql`
                    insert into user_school_lockers
                        (user_id, school_locker_campus, school_locker_number)
                    values
                        (${userId}, ${campus}, ${number})
                `;

                await sql`
                    update school_lockers
                    set is_available = false
                    where campus = ${campus} and number = ${number}
                `;
            });
        } catch (error: any) {
            throw error;
        }
    }
}

const locker = new Locker();
export default locker;
