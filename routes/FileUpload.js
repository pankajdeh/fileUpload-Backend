// express ka instance 
const express = require("express")
const router = express.Router();

// controller se handler lekr aana hai 
const {localFileUpload, imageUpload , videoUpload, imageSizeReducer} = require("../Controllers/fileUpload")

//api route define kr diya hai
router.post("/localFileUpload", localFileUpload) 
router.post("/imageUpload", imageUpload) 
router.post("/videoUpload", videoUpload) 
router.post("/imageSizeReducer", imageSizeReducer) 


module.exports = router


