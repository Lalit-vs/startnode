var Product  = require("../../model/product");
exports.product_create = function (req, res) {
    console.log(req.body);
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
                req.status(500).send({
                    status: false,
                    message: err.message || "Some error occurred while creating the product."
                });
            });
};