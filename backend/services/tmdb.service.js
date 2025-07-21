import axios from "axios"; // Importar axios para hacer peticiones HTTP
import { Env_VARS } from "../config/enVars.js"; // Importar la variable de entorno de la API de TMDB

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      // Cabeceras de la petición
      accept: "application/json", // Aceptar respuesta en formato JSON
      Authorization: "Bearer " + Env_VARS.TMDB_API_KEY, // Autenticación con la API de TMDB
    },
  };
  const response = await axios.get(url, options); // Hacer la petición a la API de TMDB
  if (response.status !== 200) {
    // Si la respuesta es correcta
    throw new Error("failed to fetch data from TMDB" + response.statusText); // Lanzar un error si la respuesta no es correcta
  }
  return response.data; // Devolver los datos de la respuesta
};
