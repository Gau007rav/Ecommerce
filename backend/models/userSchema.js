let mongoose = require("mongoose");
let validator = require("validator")
let jwt = require("jsonwebtoken")
let keySecret = "Gaurav@1456avengerendgame"
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email address");
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
   
});

//generate token
userSchema.methods.generateAuthToken = async ()=>{
    try {
        let tokenGen = jwt.sign({_id:this._id},keySecret,{
            expiresIn:"1d"
        });
        this.tokens=this.tokens.concat({token:tokenGen})
        await this.save();
        return tokenGen;
    } catch (error) {
        console.log(error.message)
    }
}

const User = new mongoose.model("User", userSchema);



module.exports = User;


