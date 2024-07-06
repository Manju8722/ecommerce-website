// async function callAsync() {
//   console.log("inside aynsc");
// }

// await callAsync();
// console.log("next line");
const path = require("path");
const mongoose = require("mongoose");
const auth = require("./model/auth");
const password = "5gEGun8SXK7ep0jG";

mongoose.connect(
  `mongodb+srv://user_temp_1:${password}@cluster0.dnv6vok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);
// const p="http:/localhost:5000/user/temp@123/temp@123.png"
// auth.findOne({ username:"namen@gmail.com" }).then((auth_cred)=>{
//   console.log(path.basename(auth_cred.image));
// });



module.exports = {
  EMAIL: "@gmail.com",
  PASSWORD: "",
};
