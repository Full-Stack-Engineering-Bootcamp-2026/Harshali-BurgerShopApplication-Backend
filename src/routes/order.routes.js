const express=require('express')
const router=express.Router()
const controller=require('../controllers/order.controller')

router.post('/checkout',controller.checkout)
router.get('/orders',controller.getOrders)

module.exports=router