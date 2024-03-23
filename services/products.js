const { Product } = require('../models');
const dataLayer = require('../dal/products');

const getProductByID = async (productId) => {
    return await dataLayer.getProductByID(productId);
}
const getAllProducts = async () => {
    return await Product.fetchAll();
}

module.exports = { getProductByID, getAllProducts }