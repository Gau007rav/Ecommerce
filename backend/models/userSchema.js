let mongoose = require("mongoose");
let validator = require("validator")
let jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
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
    ],
    carts:Array
});
// password hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//generate token
userSchema.methods.generateAuthToken = async function (){
    try {
        let token = jwt.sign({_id:this._id},keySecret,{
            expiresIn:"1d"
        });
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        console.log(error.message)
    }
}

// add to cart
userSchema.methods.addToCart=async function(cart){
    try {
        this.carts = this.carts.concat({carts:cart})
        await this.save();
        return this.carts;
    } catch (error) {
        console.log(error)
    }
}
const User = new mongoose.model("User", userSchema);



module.exports = User;


