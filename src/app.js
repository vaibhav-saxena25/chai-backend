import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    orgin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}));//form se jo bhi data aata h usse accept krta h 
app.use(express.urlencoded({extended:true,limit:"16kb"}));//url se jo bhi data aata h usse accept krta h
app.use(express.static("public"));//public folder me jo bhi file h usse access krta h
app.use(cookieParser());//cookie me jo bhi data aata h usse access krta h aur uss pr crud operation perform krta h 

export  { app }