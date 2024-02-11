let mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String
});

const Products = new mongoose.model("eproducts",productSchema);

module.exports = Products;