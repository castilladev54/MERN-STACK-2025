
/**
 * Main application component that sets up routing and authentication logic.
 *
 * - Checks user authentication status on mount.
 * - Displays a loading spinner while authentication is being checked.
 * - Defines routes for home, login, signup, watch, search, history, and 404 pages.
 * - Redirects users based on authentication state:
 *    - Unauthenticated users are redirected to login for protected routes.
 *    - Authenticated users are redirected to home from login/signup.
 * - Renders a footer and toast notifications globally.
 *
 * component
 */

{/**Hooks */}
import { useEffect } from "react";
{/**Importar rutas */}
import { Route, Routes, Navigate } from "react-router-dom";
{/**Importar Componentes */}
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import  HistoryPage  from "./pages/HistoryPage";
import NotFoundPage from "./pages/404";
import Footer from "./components/Footer";
import { useAuthStore } from "./store/authUser";
{/**Importar librerias */}
import { Toaster} from "react-hot-toast"
import { Loader } from "lucide-react";


function App() {
  const {user, isCheckingAuth, authCheck}= useAuthStore();
  
  /**Cambiar a usuario logueado */
  useEffect(() =>{
    authCheck();
  }, [authCheck]);

  {/**Condicional para Animación UI */}
  if(isCheckingAuth){
    return(
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
      </div>
    )
  }

  {/**UI RUTAS*/}
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"}/>} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"}/>} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <HistoryPage /> : <Navigate to={"/login"} />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
