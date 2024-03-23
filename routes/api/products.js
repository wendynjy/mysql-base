const express = require('express')
const router = express.Router();
const { createProductForm, bootstrapField } = require('../../forms');
const { Product } = require('../../models');

const serviceLayer = require('../../services/products')

router.get('/', async(req,res)=>{
    res.send(await serviceLayer.getAllProducts())
})

router.post('/', async (req, res) => {
    try {
        const productForm = createProductForm();
        productForm.handle(req, {
            // Success callback for handling successful form submissions
            'success': async (form) => {
                try {
                    // Create a new product instance with the form data
                    const product = new Product({
                        name: form.data.name,
                        cost: form.data.cost,
                        description: form.data.description
                    });
                    // Save the product to the database
                    await product.save();
                    // Send a success response with the created product data
                    res.status(201).json(product.toJSON());
                } catch (error) {
                    console.error('Error creating product:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            },
            'empty': async (form) => {
                res.status(400).json({
                    'error':'Form is empty'
                })
            },
            // Error callback for handling form submission errors
            'error': async (form) => {
                res.status(400).json({ error: 'Validation Error', details: form.errors });
            }
        });
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT update an existing product
router.put('/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const product = await serviceLayer.getProductByID(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Process the form synchronously
        const productForm = createProductForm();
        productForm.handle(req, {
            'success': async (form) => {
                // Update the product with the form data
                product.set(form.data);
                await product.save();
                res.status(200).json(product.toJSON());
            },
            'error': async (form) => {
                // If there are form validation errors, render the update form again with error messages
                res.status(400).json({ error: 'Validation Error', details: form.errors });
            }
        });

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE delete an existing product
router.delete('/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const product = await serviceLayer.getProductByID(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;