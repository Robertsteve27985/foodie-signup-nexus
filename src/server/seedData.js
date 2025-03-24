
const mongoose = require('mongoose');
const Food = require('./models/Food');
require('dotenv').config();

// Sample food data
const foodData = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Pizza",
    rating: 4.8,
    reviewCount: 243,
    preparationTime: 20,
    ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Fresh Basil", "Olive Oil"]
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and pepperoni",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Pizza",
    rating: 4.6,
    reviewCount: 198,
    preparationTime: 22,
    ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Pepperoni", "Olive Oil"]
  },
  {
    id: 3,
    name: "Beef Burger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Burger",
    rating: 4.5,
    reviewCount: 156,
    preparationTime: 15,
    ingredients: ["Beef Patty", "Cheese", "Lettuce", "Tomato", "Onion", "Burger Bun", "Special Sauce"]
  },
  {
    id: 4,
    name: "Chicken Burger",
    description: "Grilled chicken breast with avocado, bacon, and honey mustard",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Burger",
    rating: 4.7,
    reviewCount: 132,
    preparationTime: 17,
    ingredients: ["Chicken Breast", "Bacon", "Avocado", "Lettuce", "Burger Bun", "Honey Mustard"]
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled to perfection with lemon herb sauce",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Seafood",
    rating: 4.7,
    reviewCount: 98,
    preparationTime: 25,
    ingredients: ["Salmon Fillet", "Lemon", "Herbs", "Garlic", "Olive Oil", "Asparagus"]
  },
  {
    id: 6,
    name: "Pasta Carbonara",
    description: "Spaghetti with creamy sauce, pancetta, egg, and parmesan",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Pasta",
    rating: 4.9,
    reviewCount: 216,
    preparationTime: 18,
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper", "Garlic"]
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodieNexus')
  .then(async () => {
    console.log('MongoDB connected for seeding');
    
    try {
      // Clear existing data
      await Food.deleteMany({});
      console.log('Existing food data cleared');
      
      // Insert new data
      await Food.insertMany(foodData);
      console.log('Food data successfully seeded!');
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      // Close the connection
      mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
