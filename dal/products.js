const { Product } = require('../models');

const getProductByID = async (productId) => {
    return await Product.where({
        'id': parseInt(productId)
    }).fetch({
        require: true
    });
}
const getAllProducts = async () => {
    return await Product.fetchAll();
}

module.exports = { getProductByID, getAllProducts }