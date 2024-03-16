const bookshelf = require('../bookshelf')

const Product = bookshelf.model('Product', {
    tableName:'products'
});

module.exports = { Product };

const User = bookshelf.model('User',{
    tableName: 'users'
})

module.exports = {Product, User};