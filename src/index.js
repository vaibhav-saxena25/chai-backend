import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path:"./.env"
})
connectDB()
.then(()=>{
    app.on("error",(error)=>{          //if db connected and does not able to connect with the app then this line runs 
        console.log("SERVER ERROR",error)
        throw error
      })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`SERVER LISTENING ON PORT ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("Mongodb connection failed",err);
})
/*(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
       app.on("error",(error)=>{          //if db connected and does not able to connect with the app then this line runs 
         console.log("SERVER ERROR",error)
         throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log("SERVER LISTENING ON PORT",process.env.PORT)
       })
    }catch(error){
        console.error("ERROR",error)
        throw error
    }
})()
*/
