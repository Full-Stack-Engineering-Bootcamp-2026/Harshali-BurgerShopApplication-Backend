const repo=require('../repositories/product.repo')
const { search } = require('../routes/product.routes')

exports.getProducts=(search,category,type)=>{
    
    return repo.getProducts(search,category,type)
}