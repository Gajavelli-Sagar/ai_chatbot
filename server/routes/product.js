const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// ADD PRODUCT (Only admin)
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// GET PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// DELETE PRODUCT (Only admin)
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
