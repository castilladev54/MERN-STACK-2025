/**Importar paquetes */
import axios from "axios"; // Cliente HTTP para hacer peticiones a la API
import toast from "react-hot-toast";  // Librería para mostrar notificaciones (éxito/error)
import { create } from "zustand"; // Zustand es un manejador de estado global muy ligero

/** 
 * useAuthStore
 * Este store maneja todo lo relacionado con la autenticación del usuario:
 * - Registro (signup)
 * - Inicio de sesión (login)
 * - Cierre de sesión (logout)
 * - Verificación de sesión activa (authCheck)
 */

/**Funcion para manejar el estato global del usuario con zustand */

export const useAuthStore = create((set) => ({
	
	user: null,  // Guarda los datos del usuario autenticado
	isSigningUp: false,  // Indicador de si se está registrando un usuario
	isCheckingAuth: true,  // Indicador de si se está verificando la sesión activa
	isLoggingOut: false,  // Indicador de si se está cerrando la sesión
	isLoggingIn: false,   // Indicador de si se está iniciando sesión
	
	/** 
	 * signup
	 * Función asíncrona para registrar un nuevo usuario
	 * @param {Object} credentials - datos del formulario de registro (ej. nombre, email, password)
	 */
	
	signup: async (credentials) => {
		// Activar loading
    set({ isSigningUp: true });
		try {
			// Enviar datos al backend para crear una cuenta
      const response = await axios.post("/api/v1/auth/signup", credentials);
			// Guardar el usuario en el estado global y desactivar loading
      set({ user: response.data.user, isSigningUp: false });
			// Mostrar mensaje de éxito
      toast.success("Account created successfully");
		} catch (error) {
			// En caso de error, mostrar mensaje y limpiar estado
      toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},
	
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post("/api/v1/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
		}
	},
	
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},
	
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/v1/auth/authCheck");

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			// toast.error(error.response.data.message || "An error occurred");
		}
	},
}));