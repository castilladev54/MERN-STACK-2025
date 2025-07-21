import dotenv from "dotenv"; // Importar dotenv para cargar variables de entorno

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

export const Env_VARS={ // Exportar las variables de entorno
    Mongo_URI: process.env.Mongo_URI, // URI de MongoDB
    PORT: process.env.PORT || 5001, // Puerto del servidor
    JWT_SECRET: process.env.JWT_SECRET, // Secreto para JWT
    NODE_ENV: process.env.NODE_ENV, // Entorno de ejecución (desarrollo o producción)
    TMDB_API_KEY: process.env.TMDB_API_KEY
}

/**
 * An object containing environment variables used in the application.
 * These variables are typically loaded from the process environment.
 * 
 * @constant
 * @type {Object}
 * @property {string} Mongo_URI - The URI for connecting to the MongoDB database.
 * @property {number} PORT - The port number on which the server will run. Defaults to 5000 if not specified.
 * @property {string} JWT_SECRET - The secret key used for signing JSON Web Tokens (JWT).
 * @property {string} NODE_ENV - The current execution environment (e.g., 'development' or 'production').
 * @property {string} TMDB_API_KEY - The API key for accessing the TMDB (The Movie Database) API.
 */