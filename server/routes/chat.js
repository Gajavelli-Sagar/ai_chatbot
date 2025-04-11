const express = require('express');
const router = express.Router();
const axios = require('axios');
const Product = require('../models/Product'); // Make sure this path is correct

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    // Fetch all products from DB
    const products = await Product.find();

    // Format product info for the AI
    const productInfo = products.length
      ? products.map(p => `• ${p.name} - ₹${p.price}: ${p.description}`).join('\n')
      : 'No products are currently available.';

    // Construct context-aware prompt
    const prompt = `
You are a helpful AI assistant for an online shopping website.
The current available products are:
${productInfo}

If the user asks about the price, description, or availability of a product, answer based on this list.
Always respond in a friendly and concise manner.

User: ${message}
AI:
    `;

    // Send request to OpenRouter
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Failed to connect to AI assistant.' });
  }
});

module.exports = router;
