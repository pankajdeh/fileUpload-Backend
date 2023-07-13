//npm install cloudinary
//npm i express-fileupload
// simple express middleware for fileUpload and "multer" is a node.js middleware for handling the form data , which is used to for uploading files
//cloudinary method - upload server to media-server baad m server bale data ko delete kr deta hai us temp loacation se 
//express-fileupload method- ye server pr upload krta  hai

// Require the Cloudinary library
const cloudinary = require('cloudinary').v2;

require("dotenv").config()

exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        }
        )
    }catch(error){
        console.log(error);
        console.log("cloudinary error")

    }
}