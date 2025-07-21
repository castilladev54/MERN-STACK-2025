// Importar bcryptjs para el hash de contraseñas
import bcrypt from "bcryptjs"; 
// Importar la función para generar el token y establecer la cookie
import { generateTokenAndSetCookie } from "../utils/generateToken.js"; 
// Importar el modelo de usuario
import { User } from "../models/user.js"; 

// Función para registrar un nuevo usuario
export async function signup(req, res) {
  // Desestructurar el cuerpo de la solicitud
  try {
    const { email, password,userName} = req.body; 

    if (!email || !password || !userName) {
      // Validar que los campos no estén vacíos
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" }); // Respuesta de error
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el email

    if (!emailRegex.test(email)) {// Validar el formato del email
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" }); // Respuesta de error
    }

    if (password.length < 6) {
      // Validar la longitud de la contraseña
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      }); // Respuesta de error
    }

    const existingUser = await User.findOne({ email: email }); // Buscar si el usuario ya existe en la base de datos
    if (existingUser) {
      // Si el usuario ya existe
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" }); // Respuesta de error
    }

    const existingUserByUsername = await User.findOne({userName :userName  }); // Buscar si el nombre de usuario ya existe en la base de datos
    if (existingUserByUsername) {
      // Si el nombre de usuario ya existe
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" }); // Respuesta de error
    }

    const salt = await bcrypt.genSalt(10); // Generar un salt para la contraseña

    const hashedPassword = await bcrypt.hash(password, salt); // Hashear la contraseña

    const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]; // Array de imágenes de perfil

    const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)]; // Seleccionar una imagen de perfil aleatoria

    const newUser = new User({
      // Crear un nuevo usuario
      email,
      password: hashedPassword,
    userName ,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res); // Generar el token y establecer la cookie
    await newUser.save(); // Guardar el nuevo usuario en la base de datos

    res.status(201).json({
      // Respuesta de éxito
      success: true,
      user: {
        // Devolver el usuario creado sin la contraseña
        ...newUser._doc, // Propiedades del nuevo usuario
        password: "", // Eliminar la contraseña del objeto
      },
    });
  } catch (error) {
    console.log(error); // Imprimir el error en la consola
    return res.status(500).json({ message: "Internal server error" }); // Respuesta de error interno del servidor
  }
}

export async function login(req, res) {
  // Función para iniciar sesión
  try {
    const { email, password } = req.body; // Desestructurar el cuerpo de la solicitud

    if (!email || !password) {
      // Validar que los campos no estén vacíos
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required" });
    }

    const user = await User.findOne({ email }); // Buscar el usuario por email

    if (!user) {
      // Si no se encuentra el usuario
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" }); //
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password); // Comparar la contraseña ingresada con la almacenada

    if (!isPasswordCorrect) { // Si la contraseña no es correcta
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" }); // Respuesta de error
    }

    generateTokenAndSetCookie(user._id, res); // Generar el token y establecer la cookie
    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: "" } });
  } catch (error) {
    console.log("Error in login controller", error.message); // Imprimir el error en la consola
    res.status(500).json({ success: false, message: "Internal server error" }); // Respuesta de error interno del servidor)
  }
}

export async function logout(req, res) {
  // Función para cerrar sesión
  try {
    res.clearCookie("jwt_netflix");
    res.status(200).json({ success: true, message: "logout succesfull" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//Verifica si hay una sesión activa (por ejemplo, al recargar la página)
export async function authCheck(req, res){
  try {
    res.status(200).json({ success: true, user: req.user});
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server Error"})
  }
}
