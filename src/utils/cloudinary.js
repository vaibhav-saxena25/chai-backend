import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.confit({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_Key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath) =>{
   try{
     if(!localFilePath) return null;
     const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto",
     });
     //file has been uploaded successfully 
     console.log("file has been uploaded successfully",response.url);
     return response
   }catch(error){
      fs.unlinkSync(localFilePath) //agar upload hone m koi error agai toh hamare server me file delete krna h otherwise bahut saari malicious file aa jayenge
      return null
   }
}

export {uploadOnCloudinary}
