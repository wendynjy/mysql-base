const { Product } = require('../models');

const getProductByID = async (productId) => {
    return await Product.where({
        'id': parseInt(productId)
    }).fetch({
        require: true
    });
}

module.exports = { getProductByID }