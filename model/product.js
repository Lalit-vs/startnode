const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectData = {}
const productSchema=new mongoose.Schema({
    name :{type: String, default: null },
    slug :{type: String, default: null },
    type :{type: String, default: null },
    status: { type: String, default: null },
    sku:{type: String, default: null },
    price: {type: Number ,default: 0.00 },
    featured_image: {type: String,default:null},
    gallery_images: { type: Array, default: []},
    social_url:{type: String, default:null},
    category:{type: Schema.Types.ObjectId,ref: 'Category'},
    sub_category:{type: Schema.Types.ObjectId,default: null},
    stock:{ type:Number,default: 0 }
}, {timestamps:true});
module.exports = mongoose.model("products", productSchema);