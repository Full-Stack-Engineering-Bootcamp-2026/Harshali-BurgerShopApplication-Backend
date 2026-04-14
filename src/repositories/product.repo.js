const Product = require('../models/product')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.getProducts = (search, category, type) => {

  let where = {}        //obj for search filter

  if (search) {
    where.name = { [Op.like]: `%${search}%` }          //Op.like ,Op.in ,Op.gte
  }

  if (category) {
    where.category = category
  }

  if (type) {
    where.type = type
  }

  return Product.findAll({ where })      //select *
}

