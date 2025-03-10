import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

function connect(){
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in the environment variables");
        throw new Error("MONGODB_URI is not defined");
    }
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Successfully connected to the database");
    })
    .catch((error)=>{
        console.error("Error connecting to the database: ", error.message);
    });
}
export default connect;