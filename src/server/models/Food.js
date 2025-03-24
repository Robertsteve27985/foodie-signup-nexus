
const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  reviewCount: {
    type: Number,
    required: true
  },
  preparationTime: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Food', FoodSchema);
