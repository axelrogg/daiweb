import { auth, currentUser } from "@clerk/nextjs/server";
import database from "./database";

/**
 * Recupera información del usuario desde la base de datos y el contexto de
 * autenticación actual.
 *
 * Esta función utiliza las funciones `auth` y `currentUser` de
 * `@clerk/nextjs/server` para obtener el ID externo del usuario actualmente
 * autenticado y la información detallada del usuario. Luego consulta la base
 * de datos para encontrar el ID interno del usuario asociado con el ID externo.
 * Si tiene éxito, devuelve un objeto que contiene el ID interno del usuario,
 * el ID externo, la URL de la foto de perfil y el nombre completo del usuario.
 *
 * @returns {Promise<UserInfo | null>}
 *          Un objeto que contiene la información del usuario si el usuario
 *          está autenticado y se encuentra en la base de datos, o `null` si
 *          el usuario no está autenticado, no se encuentra o ocurre un error.
 *
 * @throws {Error} Lanza un error si hay un problema con la consulta a la base
 *                 de datos.
 *
 * @example
 * const userInfo = await useUserInfo();
 * if (userInfo) {
 *     console.log(`ID del usuario: ${userInfo.id}`);
 *     console.log(`ID externo: ${userInfo.externalId}`);
 *     console.log(`URL de la foto de perfil: ${userInfo.profilePicUrl}`);
 *     console.log(`Nombre completo: ${userInfo.fullName}`);
 * } else {
 *     console.log('Usuario no encontrado o no autenticado.');
 * }
 */
export async function useUserInfo(): Promise<UserInfo | null> {
    const { userId: userExternalId } = auth();
    const userDetails = await currentUser();

    if (!userExternalId || !userDetails) {
        return null;
    }

    try {
        const userId = await database.getUserIdFromExternalId(userExternalId);
        if (!userId) {
            return null;
        }
        return {
            id: userId,
            externalId: userDetails.id,
            profilePicUrl: userDetails.imageUrl,
            fullName: userDetails.fullName,
        };
    } catch (err) {
        return null;
    }
}

interface UserInfo {
    id: number;
    externalId: string;
    profilePicUrl: string;
    fullName?: string | null;
}
