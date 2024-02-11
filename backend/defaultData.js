let Products = require("./models/productSchema");
let productsData = require("./constant/Productdata")

const DefaultData = async()=>{
    try {
        
        const storeData = await Products.insertMany(productsData);
        console.log(storeData);
    } catch (error) {
        console.log("error" + error.message);
    }
};

module.exports = DefaultData;