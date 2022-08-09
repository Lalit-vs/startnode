var Product  = require("../../model/product");
exports.product_create = function (req, res) {
    if(!req.body.name || !req.body.price || !req.body.stock) {
        return res.status(400).send({
            success: false,
            message: "Please enter product name, price and stock"
        });
    }
    let product = new Product(
        {
            name:req.body.name,
            slug:req.body.slug,
            stock:req.body.stock,
            type:req.body.type,
            status:req.body.status,
            sku:req.body.sku,
            price:req.body.price,
            feature_image:req.body.feature_image,
            gallery_image:req.body.gallery_image,
            social_url:req.body.social_url,
            category:req.body.cat_id,
            sub_category:req.body.sub_cate_id
        }
    );
    product.save().then(data=>{
                res.send({
                    status : true,
                    data: data,
                    message:"product create successfully"
                });
            }).catch(err => {
                res.status(500).send({
                    status: false,
                    message: err.message || "Some error occurred while creating the product."
                });
            });
};

//retrieved data in databse

exports.all_products = function (req, res) {
    console.log(req.body);
    Product.find()
        .then(data => {
            var message = "";
            if(data===undefined || data.length==0) message="product data not found";
            else message="Products successfully retrieved";
                res.send({
                    success:true,
                    data: data,
                    message: message,
                });
            }).catch(err => {
                res.status(500).send({
                    status:false,
                    message: err.message || "Some error occurred while retrieving products."
                });
            });

}
exports.product_details= function(req,res){
    console.log(req.query.id);
    if(req.query.id=='' || req.query.id===undefined || req.query.id=='0'){
        return res.status(400).send({
            success: false,
            message: "product id required "
        });
    }
    Product.findById(req.query.id)
        .then(data =>{
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Product not found with id " + req.query.id
                });
            }
            res.send({
                success: true,
                message: "Product successfully retrieved ",
                data: data
            });
        }).catch(err =>{
            if(err.kind==="ObjectId"){
                res.status(404).send({
                    success:false,
                    message: "Product not found with id " + req.query.id,
                })
            }
            return res.status(500).send({
                success:false,
                message: "Error retrieved product with Id " + req.query.id,
            });
        });
}
exports.update_product= function(req,res){
    console.log(req.params.id);
        if(req.params.id===undefined  || req.params.id =='null' || req.params.id==''){
            res.status(400).send({
                success:false,
                message :"product is required"
            })
        }
        Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true}).then(data=>{
            if(!data){
                return res.status(404).send({
                    success:false,
                    message:"Product not found"
                }); 
            }
            res.send({
                success: true,
                data: data
            });
            
        }).catch(err => {
            console.log(err.message);
            if(err.kind==="ObjectId"){
                return res.status(404).send({
                    success:false,
                    message: "Product not found with id fdsfsdf" + req.params.id
                });
            }
            return res.status(500).send({
                success:false,
                message: "Error updating product with id " + req.params.id
            });

        });

}
exports.delete_product= function(req,res){
    console.log(req.params.id);
}