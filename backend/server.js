/**
 * Main server file for the MERN backend application.
 * 
 * - Sets up Express server with JSON and cookie parsing middleware.
 * - Connects to MongoDB using configuration from environment variables.
 * - Registers authentication, movie, TV, and search API routes.
 * - Protects certain routes with authentication middleware.
 * - Serves static frontend files in production environment.
 * 
 * module server
 * requires express
 * requires cookie-parser
 * requires path
 * requires ./routes/auth.route.js
 * requires ./routes/movie.route.js
 * requires ./routes/tv.route.js
 * requires ./routes/search.route.js
 * requires ./middleware/protectRoute.js
 * requires ./config/enVars.js
 * requires ./config/db.js
 * 
 * constant {string} __dirname - Absolute path to the current directory.
 * constant {object} app - Express application instance.
 * constant {number|string} PORT - Server port from environment variables.
 * 
 * function connectDB - Connects to MongoDB database.
 * function protectRoute - Middleware to protect routes.
 * 
 * description
 * Starts the Express server, connects to the database, and sets up API and static file routes.
 */
import express from "express"; // Sintaxis de ES modules
import cookieParser from "cookie-parser";
import path from "path"
import authRoutes from "./routes/auth.route.js"; // Importar las rutas de autenticación
import movieRoutes from "./routes/movie.route.js"; // Importar las rutas de películas
import tvRoutes from "./routes/tv.route.js" //Importar las rutas de tv
import searchRoutes from "./routes/search.route.js"; //Importar ruta de busquedad
import { protectRoute } from "./middleware/protectRoute.js";
import { Env_VARS } from "./config/enVars.js"; // Importar las variables de entorno
import { connectDB } from "./config/db.js"; // Importar la función para conectar a la base de datos


const __dirname= path.resolve(); 
console.log(__dirname)
const app = express(); // Crear una instancia de Express
const PORT =  Env_VARS.PORT; // Puerto del servidor  


app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(cookieParser()); // cookieParser es un middleware que analiza las cookies de las solicitudes entrantes y las convierte en un objeto accesible a través de req.cookies


app.use("/api/v1/auth", authRoutes); // Usar las rutas de autenticación
app.use("/api/v1/movie", protectRoute, movieRoutes); // Usar las rutas de películas
app.use("/api/v1/tv", protectRoute, tvRoutes);// Usar la ruta de tv
app.use("/api/v1/search", protectRoute, searchRoutes); //Usar la ruta de tv

// Middleware para servir archivos estáticos en producción
if(Env_VARS.NODE_ENV === "production"){
  
  app.use(express.static(path.join(__dirname, "frontend/dist")));
   
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => { // Iniciar el servidor
  console.log("Server started at http://localhost:" + PORT); // Imprimir en la consola que el servidor ha iniciado
  connectDB(); // Conectar a la base de datos MongoDB
});


