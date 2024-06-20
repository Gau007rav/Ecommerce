let express = require("express")
let router = new express.Router();
let Products = require("../models/productSchema")
let User = require("../models/userSchema")
const bcrypt = require("bcrypt");
let authenticate = require("../authenticate/Authenticate")
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

router.post("/register", async (req, res) => {
    //console.log(req.body)
    let { fname, email, mobile, password, cpassword } = req.body;
    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
        console.log("fill all the entry")
    }
    try {
        let preuser = await User.findOne({ email: email })
        if (preuser) {
            res.status(422).json({ error: "this user is already exist" })
        }
        else if (password !== cpassword) {
            res.status(422).json({ error: "password is not matching with cpassword" })

        }
        else {
            const finaluser = new User({
                fname, email, mobile, password, cpassword
            });
            let storedata = await finaluser.save();
            console.log("data saved successfully" + storedata);
            res.status(201).json(storedata)
        }
    } catch (error) {
        console.log("error is coming during registration" + error.message)
        res.status(422).json({ error: "something is wrong with registration process" })
    }

})

//login user

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all the details" });
    }

    try {
        const userlogin = await User.findOne({ email: email });
        
        if (!userlogin) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, userlogin.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials provided" });
        }

        const token = await userlogin.generateAuthToken(); // Corrected method name

        res.cookie("eccomerce", token, {
            expires: new Date(Date.now() + 2589000),
            httpOnly: true
        });
        res.status(201).json(userlogin);
    } catch (error) {
        console.log("Error occurred during login:", error.message);
        res.status(500).json({ error: "An error occurred during login" });
    }
});

// add to  cart


router.post("/addcart/:id" ,authenticate,async(req,res)=>{
          try {
               let {id} = req.params
               let  cart = await User.findOne({id:id})
               console.log(cart + "get the product")
               let userContact = await User.findOne({_id:req.userID})
               console.log(userContact)
               if(userContact){
                let cartData = userContact.addToCart(cart)
                await userContact.save();
                console.log(cartData + "sacving....")
                res.status(201).json(userContact)
               }
          } catch (error) {
            res.status(401).json({error:error.message})
          }
})

module.exports = router;