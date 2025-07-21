import jwt from 'jsonwebtoken'; //Importar jsonwebtoken para la creación de tokens
import { Env_VARS } from '../config/enVars.js'; // Importar las variables de entorno

export const generateTokenAndSetCookie = (userId, res) => { // Función para generar un token y establecer una cookie
  const token = jwt.sign( // Crear un token JWT
    { userId }, // Incluir el ID del usuario en el payload del token
    Env_VARS.JWT_SECRET, // Usar el secreto de JWT definido en las variables de entorno 
    { expiresIn: "15d" } // Establecer la expiración del token a 15 días
  );

  res.cookie("jwt_netflix", token,{ // Establecer la cookie con el token
    maxAge: 15 * 24 * 60 * 60 * 1000, // Establecer la duración de la cookie a 15 días
    httpOnly: true, // Hacer la cookie accesible solo a través de HTTP (no accesible desde JavaScript)
    sameSite: "strict", // Establecer la política SameSite para la cookie
    secure: Env_VARS.NODE_ENV !== "development", // Hacer la cookie segura solo en producción 
  });

  return token; // Retornar el token generado
};