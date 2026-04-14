const Sequelize=require('sequelize')
const sequelize=new Sequelize('burger','admin','Admin@123',
    {
        dialect:'mysql',host:'localhost'
    }
)
module.exports=sequelize