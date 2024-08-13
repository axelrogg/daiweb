/**
 * Converts a Date object to a string in the format "DD-MM-YYYY".
 *
 * @param {Date} date - The Date object to be converted.
 * @returns {string} A string representing the date in "DD-MM-YYYY" format.
 */
export function readableDate(date: Date): string {
    const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"];
    const months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ];

    const day = days[date.getUTCDay()];
    const daynum = String(date.getUTCDate()).padStart(2, "0");
    const month = months[date.getUTCMonth() - 1].toLowerCase();
    const year = date.getUTCFullYear();

    return `${day} ${daynum}, ${month} ${year}`;
}
