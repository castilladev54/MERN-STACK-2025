import mongoose from "mongoose";
import { Env_VARS } from "./enVars.js";

//funcion para conectar a mongodb
export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(Env_VARS.Mongo_URI);
		console.log("MongoDB connected: " + conn.connection.host);
	} catch (error) {
		console.error("Error connecting to MONGODB: " + error.message);
		process.exit(1); // 1 means there was an error, 0 means success
	}
};
