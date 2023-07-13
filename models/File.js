const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        // required:true

    },
    tags:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    }
})

// module.exports = fileSchema --- > isko yha nhi likh skte ab 

// jaise hi db m entry create ho - toh ek mail send krna hai
//Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions.


// mail send krna hai -- npm i nodemailer
//doc => jo bhi entry db m create hogi 
// momgoose library
// post middleware 




fileSchema.post("save", async function(doc){
    try{
        console.log("DOC", doc)

        //transporter
        // isko config folder m shift krna hai - bad practice 
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
 
            } 
        })

        // mail send 
        let info = transporter.sendMail({
            from:`codehelp - by you `,
            to:doc.email,
            subject:`New file uploaded in cloudinary`,
            html:`<h2>jai shree ram </h2>
            <p>File upload view here:<a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        })
        console.log("info:",info)


    }catch(error){
        console.log("error:")
        console.error(error)

    }
})



 const File = mongoose.model("File", fileSchema)
 module.exports = File;

