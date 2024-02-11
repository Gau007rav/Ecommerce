require("dotenv").config();
let express = require("express")
let mongoose = require("mongoose")
let  app = express();
require("./db/Conn")
let Products = require("./models/productSchema")
let defaultData = require("./defaultData")
const cors = require("cors")
let router=require("./routes/router")
app.use(express.json());
app.use(cors());
app.use(router);

app.get("/",(req,res)=>{
    res.send("hello word")
})

app.listen(7000,()=>{
   console.log("server started")
})

defaultData();