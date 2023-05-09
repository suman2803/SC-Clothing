const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 3001;
//Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down due to Uncaught Exception`);
  process.exit(1);
});


//config

if (process.env.NODEENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
  
//Connecting to database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.CLOUDINARYAPIKEY,
  api_secret: process.env.CLOUDINARYAPISECRET,
});


const server = app.listen(PORT,() => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

//Unhandles Promise Rejection  mongo string  error like -----so shut down server like
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
