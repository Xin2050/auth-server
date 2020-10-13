const Products = require('../models/products');

exports.getProducts = function(req,res){
    Products.find({},function (err,products){
        if(err){
            return res.json({errorMessage:err.errorMessage});
        }

        return res.json(
            {
                code:0,
                data:products,
                msg:"",
                page:null
            }
        )
    })
}
exports.getProduct = function (req,res){
    //console.log(req);
    const {id} = req.params;
    Products.findOne({"id":Number(id)},function(err,product){
        if(err){
            return res.json({errorMessage:err.errorMessage});
        }
        return res.json(
            {
                code:0,
                data:product,
                msg:"",
                page:null
            }
        )
    })
}