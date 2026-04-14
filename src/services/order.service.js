const Product = require("../models/product");
const Combo = require("../models/combo");
const Order = require("../models/order");

function mergeCartItems(items) {           //merge items in cart

  const result = {};

  items.forEach((item) => {
    const id = item.productId;
    result[id] = (result[id] || 0) + item.quantity;
  });

  return Object.keys(result).map((id) => ({
    productId: Number(id),
    quantity: result[id],
  }));
}

function validateItems(cartItems) {             //cart validation
  if (cartItems.length === 0) 
    {throw new Error("Cart empty");}

  cartItems.forEach((item) => {

    if (item.quantity <= 0 || item.quantity > 9) {
      throw new Error("Invalid quantity");
    }

    
  });
}

function getComboDiscount(combo) {
  let actual = 0;

  combo.products.forEach((p) => {
    actual += p.price * p.comboItem.quantity;
  });

  return actual - combo.price;
}

function getMinCost(cartMap, productList, combos) {

  let cart = { ...cartMap };
  let total = 0;
  let appliedCombos = [];

  for (let eachCombo of combos) {
    let count = 0;

    while (true) {
      let isApplicable = eachCombo.products.every(
        (p) => cart[p.id] && cart[p.id] >= p.comboItem.quantity
      );

      if (!isApplicable) break;

      eachCombo.products.forEach((p) => {
        cart[p.id] -= p.comboItem.quantity;
        if (cart[p.id] === 0) delete cart[p.id];
      });

      total += eachCombo.price;
      count++;
    }

    if (count > 0) {
      appliedCombos.push({
        comboId: eachCombo.id,
        name: eachCombo.name,
        quantity: count,
        price: eachCombo.price,
      });
    }
  }

  for (let id in cart) {
    const product = productList.find((p) => p.id == id);
    total += product.price * cart[id];
  }

  return { total, appliedCombos };
}

exports.checkout = (name, email, items) => {
    
  let productList;
  let cartItems;
  let totalActual;

  return Product.findAll()
    .then((products) => {
      productList = products;

      cartItems = mergeCartItems(items);

      validateItems(cartItems, productList);

      totalActual = 0;
      cartItems.forEach((item) => {
        const prod = productList.find((p) => p.id === item.productId);
        totalActual += prod.price * item.quantity;
      });

      return Combo.findAll();
    })
    .then((combos) => {
      return Promise.all(
        combos.map((combo) =>
          combo.getProducts().then((products) => {
            combo.products = products;
            return combo;
          })
        )
      );
    })
    .then((fullCombos) => {
      fullCombos.sort((a, b) => {

        const discountA = getComboDiscount(a);
        const discountB = getComboDiscount(b);
        return discountB - discountA;
      });

      const cartMap = {};
      cartItems.forEach((item) => {
        cartMap[item.productId] = item.quantity;
      });

      const result = getMinCost(cartMap, productList, fullCombos);

      const optimizedTotal = result.total;
      const appliedCombos = result.appliedCombos;

      return Order.create({
        name,
        email,
        actualAmount: totalActual,
        optimizedAmount: optimizedTotal,
        appliedCombos: appliedCombos,
      })
      .then((order) => {
        return Promise.all(
          cartItems.map((item) =>
            order.addProduct(item.productId, {
              through: { quantity: item.quantity },
            })
          )
        ).then(() => ({
          actual: totalActual,
          optimized: optimizedTotal,
          appliedCombos: appliedCombos,
        }));
      });
    });
};

exports.getOrders = () => {
  return Order.findAll();
};