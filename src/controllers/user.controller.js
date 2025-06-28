import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password,fullName } = req.body;
    if(
        [userName,email,password,fullName].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required");
    }
    const existedUser = User.findOne({
        $or:[{ userName },{ email }]
    })
    if(existedUser){
        throw new ApiError(409,"User with this username or email already exists");
    }
    // console.log(req.files?.avatar[0]?.path)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        userName:userName.toLowerCase(),
        email,
        password
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registring the user");
    }
    return res.status(201).json(
         new ApiResponse(200,createdUser,"User Registered Successfully")
    )
});

export {registerUser};