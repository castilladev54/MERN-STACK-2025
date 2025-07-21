import express from "express"; // Importar express
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js"; // Importar los controladores de autenticación
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router(); // Crear una nueva instancia de Router

// Define las rutas de autenticación
router.post("/signup", signup); // Ruta de registro de usuario 
router.post("/login", login); // Ruta de inicio de sesión
router.post("/logout", logout); // Ruta de cierre de sesión
router.get("/authCheck", protectRoute, authCheck) //Verificar sesión activa. 

export default router;

