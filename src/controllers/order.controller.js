const service=require('../services/order.service')

exports.checkout=(req,res)=>{
    
    const {name,email,items} =req.body

    service.checkout(name,email,items)
    .then(data=>res.json(data))
    .catch(err=>res.status(400)
    .json({message: err.message}))
}

exports.getOrders =(req,res)=>{

    service.getOrders()
    .then(data=>res.json(data))
    .catch(err=>res.status(400)
    .json({message: err.message}))
}