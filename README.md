

🎬 Clon de Netflix con MERN StackEste proyecto es un clon simplificado de Netflix, construido con la pila MERN (MongoDB, Express.js, React.js, Node.js). Permite a los usuarios registrarse, iniciar sesión y explorar una colección de películas y series de televisión.✨ CaracterísticasAutenticación de Usuarios: Registro e inicio de sesión seguro con JWT.Gestión de Perfiles: Los usuarios pueden gestionar sus perfiles.Exploración de Contenido: Navega por una biblioteca de películas y series.Diseño Responsivo: Experiencia de usuario optimizada para diferentes dispositivos.🚀 Tecnologías UtilizadasBackend (Node.js, Express.js):Node.js: Entorno de ejecución de JavaScript.Express.js: Framework web para Node.js.MongoDB: Base de datos NoSQL para almacenar datos de usuarios y contenido.Mongoose: ODM (Object Data Modeling) para MongoDB.JWT (JSON Web Tokens): Para autenticación segura.Bcrypt.js: Para el hash de contraseñas.Dotenv: Para gestionar variables de entorno.Axios: Cliente HTTP para realizar peticiones.Cookie-parser: Para analizar cookies adjuntas a la petición del cliente.Frontend (React.js):React.js: Biblioteca de JavaScript para construir interfaces de usuario.React Router DOM: Para la navegación en la aplicación de una sola página.Tailwind CSS: Para un diseño rápido y responsivo.Axios: Para consumir la API del backend.📸 Captura de PantallaAquí tienes una vista previa de la aplicación en acción:!(paragithub.jpg)📦 Estructura del Proyectomern/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── Dockerfile
├── frontend/
│ ├── public/

│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...
│ └── Dockerfile
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
⚙️ Configuración y Ejecución Local Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.Pre-requisitos Asegúrate de tener instalado lo siguiente:Node.js (v18 o superior)npm (v8 o superior)MongoDB (local o una instancia en la nube como MongoDB Atlas)Docker y Docker Compose (opcional, pero recomendado para un entorno consistente)1. Clonar el Repositorio git clone <URL_DE_TU_REPOSITORIO>
cd mern 2. Configuración de Variables de EntornoCrea un archivo .env en el directorio raíz de tu proyecto (mern/.env) y añade las siguientes variables. Puedes copiar el contenido de .env.example.# .env
MONGO_URI=mongodb://localhost:27017/mernflix # O tu URI de MongoDB Atlas
PORT=5000
JWT_SECRET=tu_secreto_jwt_muy_seguro
TMDB_API_KEY=tu_clave_api_tmdb # Si usas la API de TMDB

"¡Un gran agradecimiento por haber llegado hasta aquí! 🍻"
