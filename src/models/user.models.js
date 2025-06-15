import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //comes from the cloudinary
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        types: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
//Middlewares
userSchema.pre("save", async function (next) {    // jo bhi user ka data save hoga usse pehle ye middleware chalega aur password ko encrypt kr dega 
    if(!this.isModified("password")) return next();
    this.password =  bcrypt.hash(this.password,10);
    next();
})
//creating some methods
userSchema.methods.isPassowrdCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
