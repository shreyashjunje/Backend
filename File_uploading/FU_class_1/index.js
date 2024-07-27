/*This line imports the Express framework, 
which is used to create a web server and handle HTTP requests.*/
const express = require("express");

// This line loads environment variables from a .env file into process.env
require("dotenv").config();

//app create
// Essentially, this line creates a new Express application and assigns it to the app variable.
const app = express();

//port find kiya
const PORT = process.env.PORT || 8000;

//db se connect karna hai
const connectWithDB = require("./config/database");
connectWithDB();

//middleware add karna hai
// This middleware is used to parse incoming JSON requests.
// It extracts the JSON data from the request body and makes it available in req.body.
app.use(express.json());

// express does not have any method to interact with files
//  thats why we need third party package to interact with files
//npm i express-fileupload
// it stores files on server
const fileupload = require("express-fileupload");
app.use(fileupload());

//cloud se connect karna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount karna hai
const FileUpload = require("./routes/FileUpload");
app.use("/api/v1/upload", FileUpload);

//server activate karna hai
app.listen(PORT, (req, res) => {
  // res.send(`App is listening at ${PORT}`)
  console.log(`app is running at ${PORT}`);
});
