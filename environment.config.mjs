/**
 * Este archivo gestiona las variables de entorno necesarias para el
 * funcionamiento de la web.
 *
 * La función `checkEnvironmentVariables` se asegura de que todas las variables
 * de entorno estén definidas antes de que la aplicación se inicie. Si alguna
 * variable de entorno falta, el proyecto no puede iniciarse.
 */

"use strict";

/**
 * Las siguientes constantes son todas las variables de entorno que necesitamos
 * para la web. Si en algún momento tenemos más, debemos agregarlas aquí primero.
 *
 * Los valores de `AUTH_GOOGLE_ID` y `AUTH_GOOGLE_SECRET` se pueden encontrar en
 * el Google Cloud console.
 *
 * `AUTH_SECRET` es la variable necesaria por AuthJS.
 *
 * `DATABASE_CONNECTION_STR` es el url de la base de datos.
 * `EMAIL_SERVICE_API_KEY` es el API KEY de Resend, el servicio que utilizamos
 *  para enviar emails.
 */
const AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID;
const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET;
const AUTH_SECRET = process.env.AUTH_SECRET;
const DATABASE_CONNECTION_STR = process.env.DATABASE_CONNECTION_STR;
const EMAIL_SERVICE_API_KEY = process.env.EMAIL_SERVICE_API_KEY;
const EMAIL_SERVICE_SECRET = process.env.EMAIL_SERVICE_SECRET;
const NODE_ENV = process.env.NODE_ENV;

/**
 * Objeto que contiene todas las variables de entorno requeridas por la web.
 *
 * @type {Object}
 * @property {string} AUTH_GOOGLE_ID - Google Client ID.
 * @property {string} AUTH_GOOGLE_SECRET - Google Client secret.
 * @property {string} AUTH_SECRET - Secreto de AuthJS
 * @property {string} DATABASE_CONNECTION_STR - Url de conexión con la base de datos.
 * @property {string} EMAIL_SERVICE_API_KEY - API KEY de Resend, el servicio de email.
 * @property {string} NODE_ENV - Contexto de ejecución de daiweb
 */
const envSecrets = {
    AUTH_GOOGLE_ID: AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: AUTH_GOOGLE_SECRET,
    AUTH_SECRET: AUTH_SECRET,
    DATABASE_CONNECTION_STR: DATABASE_CONNECTION_STR,
    EMAIL_SERVICE_API_KEY: EMAIL_SERVICE_API_KEY,
    EMAIL_SERVICE_SECRET: EMAIL_SERVICE_SECRET,
    NODE_ENV: NODE_ENV,
};

/**
 * Verifica si todas las variables de entorno requeridas están definidas.
 *
 * Esta función itera sobre el objeto `envSecrets` y verifica si alguna de las
 * variables de entorno requeridas no está definida. Si alguna de las variables
 * falta, lanza un error con un mensaje detallado que indica qué variable no
 * está configurada.
 *
 * @throws {Error} Lanza un error antes de iniciar el proyecto, si alguna
 *                 variable de entorno no está definida
 */
function checkEnvironmentVariables() {
    Object.entries(envSecrets).forEach(([secretName, secret]) => {
        if (!secret) {
            throw new Error(
                `Environment variable ${secretName} is not defined. ` +
                    "Please make sure to add it to your .env.local file " +
                    "if you are in development mode or in Vercel's dashboard " +
                    "if you are deploying to production"
            );
        }
    });
}

export default checkEnvironmentVariables;
