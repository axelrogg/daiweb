/**
 * Converts a Date object to a string in the format "DD-MM-YYYY".
 *
 * @param {Date} date - The Date object to be converted.
 * @returns {string} A string representing the date in "DD-MM-YYYY" format.
 */
export function dateToDMY(date: Date): string {
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
}
