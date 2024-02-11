let express = require("express")
let router = new express.Router();
let Products=require("../models/productSchema")
let User = require("../models/userSchema")
router.get("/getproducts", async (req, res) => {
    try {
        const producstdata = await Products.find();
        console.log(producstdata + "data mila hain");
        res.status(201).json(producstdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});

// getindividual

router.get("/getproductsone/:id", async (req, res) => {

    try {
        const { id } = req.params;
        console.log(id);

        const individual = await Products.findOne({ id: id });
        console.log(individual + "ind mila hai");

        res.status(201).json(individual);
    } catch (error) {
        res.status(400).json(error);
    }
});

//register data

router.post("/register",async(req,res)=>{
   //console.log(req.body)
     let{fname,email,mobile,password,cpassword}=req.body;
     if(!fname  || !email || !mobile || !password || !cpassword){
        res.status(422).json({error:"fill all the details"})
        console.log("fill all the entry")
     }
        try {
            let preuser = await User.findOne({email:email})
            if(preuser){
                res.status(422).json({error:"this user is already exist"})
            }
            else if(password !== cpassword){
                res.status(422).json({error:"password is not matching with cpassword"})

            }
            else{
                const finaluser = new User({
                    fname, email, mobile, password, cpassword
                });
                let storedata = await finaluser.save();
                console.log("data saved successfully"+storedata);
                res.status(201).json(storedata)
            }
        } catch (error) {
            console.log("error is coming during registration"+error.message)
            res.status(422).json({error:"something is wrong with registration process"})
        }
     
})

//login user

router.post("/login",async(req,res)=>{
    let{email,password}=req.body
    if(!email || !password){
        res.status(400).json({error:"fill all the details"})
    }
    try {
        let userLogin = await User.findOne({email:email}).select("-password -tokens -cpassword")
        console.log(userLogin)
        if(userLogin){
            password = userLogin.password
            console.log("good to go");

        }
        else if(!userLogin){
            res.status(400).json({error:"user not found"})
        }
        else {
            //let token = await userLogin.generateAuthToken()
            console.log("token")
        }
    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("error the bhai catch ma for login time" + error.message);
    }
})

module.exports=router;