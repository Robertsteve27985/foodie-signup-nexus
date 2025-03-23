
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Utensils, Clock, Star } from "lucide-react";

// Sample food data
const FOODS = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Pizza",
    prepTime: "15-20 min",
    rating: 4.8,
    tags: ["vegetarian", "italian"]
  },
  {
    id: 2,
    name: "Chicken Alfredo Pasta",
    description: "Creamy pasta with grilled chicken and parmesan cheese",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Pasta",
    prepTime: "20-25 min",
    rating: 4.6,
    tags: ["chicken", "italian"]
  },
  {
    id: 3,
    name: "Beef Burger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Burger",
    prepTime: "10-15 min",
    rating: 4.5,
    tags: ["beef", "american"]
  },
  {
    id: 4,
    name: "Vegetable Stir Fry",
    description: "Fresh vegetables stir-fried with tofu in a savory sauce",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Asian",
    prepTime: "15-20 min",
    rating: 4.3,
    tags: ["vegetarian", "vegan", "asian"]
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled to perfection with lemon herb sauce",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Seafood",
    prepTime: "20-25 min",
    rating: 4.7,
    tags: ["seafood", "healthy"]
  },
  {
    id: 6,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with croutons, parmesan, and Caesar dressing",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Salad",
    prepTime: "5-10 min",
    rating: 4.2,
    tags: ["salad", "healthy"]
  }
];

// Categories for filtering
const CATEGORIES = ["All", "Pizza", "Pasta", "Burger", "Asian", "Seafood", "Salad"];

const FoodMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [foods, setFoods] = useState(FOODS);
  const [loading, setLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter foods based on search term and selected category
  useEffect(() => {
    if (searchTerm === "" && selectedCategory === "All") {
      setFoods(FOODS);
      return;
    }
    
    const filtered = FOODS.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           food.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFoods(filtered);
  }, [searchTerm, selectedCategory]);

  // Image loading state handler
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  
  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover our delicious selection of freshly prepared meals, made with the finest ingredients
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8 animate-scale-in">
          <div className="glass-card p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 form-input"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-3 py-1 cursor-pointer text-sm ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-secondary"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="food-card">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 animate-pulse rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
                </div>
              </div>
            ))
          ) : foods.length > 0 ? (
            foods.map((food) => (
              <Link to={`/food/${food.id}`} key={food.id}>
                <div className="food-card h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img
                      src={food.image}
                      alt={food.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        loadedImages[food.id] ? "img-loaded" : "img-loading"
                      }`}
                      onLoad={() => handleImageLoad(food.id)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-primary text-primary-foreground">
                          ${food.price.toFixed(2)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-white text-xs font-medium">{food.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="mb-2 flex justify-between items-start">
                      <h3 className="font-bold text-lg line-clamp-1">{food.name}</h3>
                      <Badge variant="outline" className="ml-2 text-xs flex-shrink-0">
                        {food.category}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {food.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{food.prepTime}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {food.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-secondary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 pt-0">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Order Now
                    </Button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Utensils className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No food items found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filter settings
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FoodMenu;
