const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productName: String,
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('Order', OrderSchema);
