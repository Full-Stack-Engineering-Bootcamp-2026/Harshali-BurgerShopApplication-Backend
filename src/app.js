const express=require('express')
const cors=require('cors')
const sequelize=require('./util/database')
const productRoutes=require('./routes/product.routes')
const orderRoutes=require('./routes/order.routes')
const comboRoutes=require('./routes/combo.routes')
//console.log(orderRoutes)


const Product=require('./models/product')
const Combo=require('./models/combo')
const ComboItem=require('./models/combo-item')
const Order=require('./models/order')
const OrderItem=require('./models/order-item')
//console.log(Product)

Combo.belongsToMany(Product,{through:ComboItem})
Product.belongsToMany(Combo,{through:ComboItem})

Order.belongsToMany(Product,{through:OrderItem})
Product.belongsToMany(Order,{through:OrderItem})

const app=express()
app.use(cors())
app.use(express.json())
app.use(productRoutes)
app.use(orderRoutes)
app.use(comboRoutes)

sequelize.sync().then(()=>{
    app.listen(5000,()=>{console.log('server running')})
})