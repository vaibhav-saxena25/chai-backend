import mongoose from 'mongoose';
import {DB_NAME} from "../constants.js";

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n Mongo db connected !! HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("Monog db connection error",error);
        process.exit(1);//exit with failure process ke bare m padho 
    }
}
export default connectDB;