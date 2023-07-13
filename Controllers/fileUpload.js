

// kis type ka data store krna hia 
// agar need hai toh -- kis type ka model define krna hai // ho skta hia hume env wali file ko import krne ki need pad jaye // hoskta hai 3rd party package ki need pad jaye 
//jab hum image ya video upload krenge toh hume --> cloudinary wale packege ki  upload function ke need padegi 


// model import

const File = require("../models/File")
const cloudinary = require("cloudinary").v2;



// local file upload handler - client ke path se Data lekr- server ke kisi path m us media/DAta ko store krta hai 

// localfileupload---> handler function 


exports.localFileUpload =async (req, res) => {
    try{
        //fetch file from request -- > req.files.[File_Name]
        const file = req.files.file
        console.log("aapki file =>",file );

        
        // create path where file need to be stored on server 

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}` ;
        console.log("PATH=>", path)

        //add path to the server m 
        file.mv(path, (err) =>{
            console.log("error::",err);
        })

        //create a successful response
        res.json({
            success:true,
            message:"Local file uploaded successfully"
        })
    }
    catch(error){
        console.log("not able to upload the file on server")
    }
}


function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type)
}

async function uploadFileToCloudinary(file, folder, quality){

    const options = {folder};  

    console.log("temp file path", file.tempFilePath)
    let = quality;

    if(quality){
        options.quality = quality
    }

    options.resource_type = "auto"
    // file upload ke liye "file.tempFilePath " parameter dalna jaruri hai --> idk logic
    return  await cloudinary.uploader.upload(file.tempFilePath, options)
} 


// // =====>>  ImageUpload  =========================================================================================================
// image upload ka handler 
// image upload --> data fetch -->Validation ->fileTYpe -> supported or not -> if yes supported--> upload to cloudinary ->db save -> successfull response 

exports.imageUpload = async (req, res) =>{
    try{ 
        //fetch data 
        const {name, tags, email} = req.body
        console.log(name, tags, email)

        //file recieve path -> req.files.[fileName]
        const file = req.files.imageFile
        console.log("imageFile:",file)

        //validation - check support types
        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split(".")[1].toLowerCase();
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }
        //now file format supported hai

        console.log("file format supported hai")
        const response = await uploadFileToCloudinary(file, "codehelp", 0)
        console.log("response:",response)


        // dm me entry save krna hia 
        const fileData = await File.create({
            name,
            tags,
            email,  
            imageUrl:response.secure_url
        })

        console.log("fileDAta::", fileData)
        
        res.json({
            success:true,
            message:"Image Successfully Uploaded"
        })


    }catch(error){
        console.log("hello")
        console.error(error)
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })

    }
}



// // =====>>  videoUpload  =========================================================================================================
// // video Upload --> data fetch ->validation -> size bta do --> upload to cloudinary-> db save ->response successfull
exports.videoUpload = async(req, res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body
        console.log("fetch data:", name, tags, email)

        const file = req.files.videoFile;
        console.log("filehello", file)


        // validation 
        const supportedTypes = ["mp4", "mov"]
        // const fileType = file.name.split(".")[1].toLowerCase();
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("fileType:", fileType)
        
        // how to add a upper limit of 5mb for video 

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }

        // file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "codehelp", 0);
        console.log(response);


        // db m entry save
        const fileData = await File.create({
            name, tags, email, 
            image_Url:response.secure_url
        })
        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:"video Successfully Upload"
        })



    }catch(error){
        console.error(error)
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}



// // =====>>  imageSizeReducer  ========================================================================================================
exports.imageSizeReducer = async(req, res) =>{
    try{ 
        //fetch data 
        const {name, tags, email} = req.body
        console.log(name, tags, email)

        //file recieve path -> req.files.[fileName]
        const file = req.files.imageFile
        console.log("file::",file)

        //validation - check support types
        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("fileType:", fileType)
  
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }
        //now file format supported hai

        console.log("uploding to codehelp folder")
        const response = await uploadFileToCloudinary(file, "codehelp", 2)
        console.log("response:",response)


        // dm me entry save krna hia 
        const fileData = await File.create({
            name,
            tags,
            email,  
            imageUrl:response.secure_url
        })

        console.log("fileDAta::", fileData)
        
        res.json({
            success:true,
            message:"Image Successfully Uploaded"
        })


    }catch(error){
        console.log("hello")
        console.error(error)
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })

    }
}