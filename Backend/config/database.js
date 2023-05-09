const mongoose = require("mongoose");



  const connectDatabase = ( )=>{
//I PUT THIS LINE IN FEB THERE ARE SOME CHNAGES IN MONGO
 mongoose.set("strictQuery",false);
//  const url = process.env.DBURL
    mongoose.connect("mongodb+srv://sonucollection2000:bsQlzewVkYw9dNrU@cluster0.20x7oes.mongodb.net/Sc-Clothing?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        });
  }  

module.exports = connectDatabase  