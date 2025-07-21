import mongoose from "mongoose"; // Importar mongoose para manejar la base de datos MongoDB

const userSchema = mongoose.Schema({ // Definir el esquema de usuario
  userName:{ // Nombre de usuario
    type: String, // Tipo de dato String
    required: true, // Requerido
    unique: true, // Único
  },
  email:{ // Email
    type: String, // Tipo de dato String
    required: true, // Requerido
    unique: true, // Único
    lowercase: true, // Convertir a minúsculas
    trim: true, // Eliminar espacios en blanco al principio y al final
  }, 
  password:{ // Contraseña
    type: String, // Tipo de dato String
    required: true, // Requerido,
  },
  image:{
    type: String, // Tipo de dato String
    default:"", // Por defecto vacío
  },
  searchHistory:{
    type: Array, // Tipo de dato Array
    default: [], // Por defecto vacío
  }  
})

export const User = mongoose.model("User", userSchema); // Crear el modelo de usuario a partir del esquema