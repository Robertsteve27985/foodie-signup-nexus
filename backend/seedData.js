
const mongoose = require('mongoose');
const Food = require('./models/Food');
require('dotenv').config();

const foodData = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce on a toasted bun.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
    category: "Burger",
    rating: 4.5,
    reviewCount: 120,
    preparationTime: 15,
    ingredients: ["Beef patty", "Cheese", "Lettuce", "Tomato", "Onion", "Bun", "Special sauce"]
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a thin crust.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Pizza",
    rating: 4.7,
    reviewCount: 89,
    preparationTime: 20,
    ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Fresh basil", "Olive oil", "Salt"]
  },
  {
    id: 3,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon fillet, grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Seafood",
    rating: 4.8,
    reviewCount: 75,
    preparationTime: 25,
    ingredients: ["Salmon fillet", "Lemon", "Butter", "Garlic", "Herbs", "Seasonal vegetables", "Salt", "Pepper"]
  },
  {
    id: 4,
    name: "Chicken Caesar Salad",
    description: "Crisp romaine lettuce with grilled chicken, parmesan cheese, croutons, and classic Caesar dressing.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Salad",
    rating: 4.3,
    reviewCount: 62,
    preparationTime: 12,
    ingredients: ["Romaine lettuce", "Grilled chicken breast", "Parmesan cheese", "Croutons", "Caesar dressing", "Black pepper"]
  },
  {
    id: 5,
    name: "Vegetable Stir Fry",
    description: "Fresh vegetables stir-fried in a savory sauce, served over steamed rice or noodles.",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    category: "Asian",
    rating: 4.4,
    reviewCount: 58,
    preparationTime: 18,
    ingredients: ["Bell peppers", "Broccoli", "Carrots", "Snap peas", "Onion", "Garlic", "Ginger", "Soy sauce", "Rice or noodles"]
  },
  {
    id: 6,
    name: "Chocolate Brownie Sundae",
    description: "Warm chocolate brownie topped with vanilla ice cream, chocolate sauce, whipped cream, and a cherry.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
    category: "Dessert",
    rating: 4.9,
    reviewCount: 102,
    preparationTime: 10,
    ingredients: ["Chocolate brownie", "Vanilla ice cream", "Chocolate sauce", "Whipped cream", "Cherry", "Nuts"]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodieNexus');
    console.log('MongoDB connected for seeding');
    
    // Delete existing data
    await Food.deleteMany({});
    console.log('Existing food data cleared');
    
    // Insert new data
    await Food.insertMany(foodData);
    console.log('Database seeded successfully with food data');
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
