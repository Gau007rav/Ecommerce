let mongoose = require("mongoose")
let db = "mongodb+srv://gaurav033singh:ipR5HIC9X5PpFcbk@cluster0.mhm7u36.mongodb.net/Ecommerce?retryWrites=true&w=majority"
mongoose.connect(db).then(()=>console.log("database connected")).catch((err)=>console.log("error"+err.message))