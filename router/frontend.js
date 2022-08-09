require("dotenv").config();
const express = require("express");
const auth = require("../middleware/auth");

const router = new express.Router();
var userscontroller = require('../controllers/frontend/userscontroller');
var productcontroller = require('../controllers/frontend/productcontroller');
var update =  async function(req,res){
    var data= [1,2,3];
    return res.status(200).json({ "status": true,"data": data });
  }
router.get("/user", function(req,res){
  var data= [1,2,3];
  return res.status(200).json({ "status": true,"data": data });
});
/*router.get("/new_user", function(req,res){
  return res.status(200).json({ "status": true,"data": data });
});*/

router.post("/user_create", userscontroller.create);
router.post("/add_product", productcontroller.product_create);

module.exports = router;