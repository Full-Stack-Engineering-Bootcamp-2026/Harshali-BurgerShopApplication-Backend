const service=require('../services/product.service')

exports.getProducts = (req,res)=>{
    const {search,category,type} =req.query

    service.getProducts(search,category,type)
    .then(data=> res.json(data))
    .catch(err=>res.status(400)
    .json({message:err.message}))
}