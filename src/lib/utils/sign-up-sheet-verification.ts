import PDFParser from "pdf2json";

/**
 * Parses the content of a university sign up PDF file to verify student information.
 * @param {Buffer} fileBuffer - The buffer containing the PDF file content.
 * @param {string} academicPeriod - The academic period in the format "YYYY/YY".
 * @param {string} studentName - Student's full name.
 * @param {string} studentId - Student's ID.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the student information is valid or not.
 */
export async function parseStudentSignUpPdfFileContent(
    fileBuffer: Buffer,
    academicPeriod: string,
    allowedSchoolName: string,
    studentName: string,
    studentId: string
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const parser = new PDFParser();
        parser.on("pdfParser_dataReady", (data) => {
            let keywords: string[] = [];
            for (let i = 0; i < data.Pages[0].Texts.length; i++) {
                const text = decodeURIComponent(data.Pages[0].Texts[i].R[0].T);
                if (text === "DATOS") {
                    break;
                }
                keywords.push(text.toLowerCase());
            }
            resolve(
                validateStudentInfo(
                    keywords,
                    academicPeriod,
                    allowedSchoolName,
                    studentName,
                    studentId
                )
            );
        });
        parser.on("pdfParser_dataError", (error) => {
            reject(error);
        });
        parser.parseBuffer(fileBuffer);
    });
}

/**
 * Validates student information from university sign up PDF document.
 *
 * @param {string[]} keywords - Array of strings containing PDF keywords.
 * @param {string} academicPeriod - The academic period in the format "YYYY/YY".
 * @param {string} allowedSchoolName - The name of the faculty/school a user can be allowed to be in.
 * @param {string} studentName - Student's full name.
 * @param {string} studentId - Student's ID.
 * @returns {boolean} Returns true if the student information matches the provided parameters, otherwise false.
 */
function validateStudentInfo(
    keywords: string[],
    academicPeriod: string,
    allowedSchoolName: string,
    studentName: string,
    studentId: string
): boolean {
    if (keywords[5].slice(0, keywords[5].length - 2) !== academicPeriod) {
        return false;
    }

    // Get the name of the student
    const name = keywords.slice(
        keywords.indexOf("estudiante:") + 1,
        keywords.indexOf("nia:")
    );

    // Find the name of the faculty/school
    const facultyNameParts = [];
    for (let j = keywords.indexOf("-") + 1; keywords[j] !== "-"; j++) {
        facultyNameParts.push(keywords[j]);
    }

    facultyNameParts.pop(); // El último elemento no es parte del nombre de la facultad/escuela.
    const facultyName = facultyNameParts.join(" ");

    // Find that fucking last name's comma
    let i;
    for (i = 0; i < name.length; i++) {
        if (name[i].includes(",")) {
            break;
        }
    }

    // Remove the comma from the second last name
    name[i] = name[i].slice(0, name[i].length - 1);

    // Rearrange the name to make it look not stupid
    const firstName = name.slice(i + 1, name.length);
    const lastName = name.slice(0, 2);
    const fileStudentName = `${firstName.join(" ")} ${lastName.join(" ")}`;

    // Get the ID of the student
    const fileStudentId = keywords[keywords.indexOf("dni:") + 1];

    if (
        !(
            studentName.toLowerCase() === fileStudentName &&
            studentId.toLowerCase() === fileStudentId &&
            allowedSchoolName.toLowerCase() === facultyName
        )
    ) {
        return false;
    }

    return true;
}
