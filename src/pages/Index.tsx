
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  ShoppingBag
} from "lucide-react";

// Sample featured foods
const FEATURED_FOODS = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    category: "Pizza"
  },
  {
    id: 3,
    name: "Beef Burger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    category: "Burger"
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled to perfection with lemon herb sauce",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    category: "Seafood"
  }
];

// Sample categories
const CATEGORIES = [
  {
    id: 1,
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    count: 12
  },
  {
    id: 2,
    name: "Burger",
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    count: 8
  },
  {
    id: 3,
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    count: 10
  },
  {
    id: 4,
    name: "Seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    count: 6
  }
];

const Index = () => {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);
  
  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    window.location.href = `/menu?search=${encodeURIComponent(search)}`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary to-background pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Delicious Food Delivered to Your
              <span className="text-primary"> Doorstep</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
              Order your favorite meals from the best restaurants in town and have them delivered quickly to your location.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for food, cuisine, or restaurant..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-20 form-input py-6 text-lg"
                />
                <Button type="submit" className="absolute right-1.5 top-1.5 bg-primary hover:bg-primary/90">
                  Search
                </Button>
              </div>
            </form>
            
            {!isLoggedIn && (
              <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4">
                <Link to="/signup">
                  <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 px-8">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full md:w-auto px-8">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-10"></div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ordering your favorite food has never been easier with our simple process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-6 md:p-8 rounded-xl text-center animate-scale-in">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Browse Menu</h3>
              <p className="text-muted-foreground">
                Explore our wide selection of delicious meals from various cuisines
              </p>
            </div>
            
            <div className="glass-card p-6 md:p-8 rounded-xl text-center animate-scale-in delay-100">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Place Order</h3>
              <p className="text-muted-foreground">
                Select your favorite items, customize as needed, and place your order
              </p>
            </div>
            
            <div className="glass-card p-6 md:p-8 rounded-xl text-center animate-scale-in delay-200">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Track your order in real-time and receive it at your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Foods Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Dishes</h2>
            <Link to="/menu" className="text-primary hover:underline flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_FOODS.map((food) => (
              <Link to={`/food/${food.id}`} key={food.id}>
                <div className="food-card h-full flex flex-col animate-scale-in">
                  <div className="relative h-56 overflow-hidden rounded-t-xl">
                    <img
                      src={food.image}
                      alt={food.name}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        loadedImages[`featured-${food.id}`] ? "img-loaded" : "img-loading"
                      }`}
                      onLoad={() => handleImageLoad(`featured-${food.id}`)}
                    />
                    <div className="absolute top-0 right-0 m-3">
                      <div className="flex items-center bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-xs font-medium">{food.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{food.name}</h3>
                      <span className="font-bold text-primary">${food.price.toFixed(2)}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {food.description}
                    </p>
                  </div>
                  
                  <div className="p-4 pt-0 mt-auto">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Order Now
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Food Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of food categories to find exactly what you're craving
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <Link to={`/menu?category=${category.name}`} key={category.id}>
                <div className="relative rounded-xl overflow-hidden h-40 group animate-scale-in">
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      loadedImages[`category-${category.id}`] ? "img-loaded" : "img-loading"
                    }`}
                    onLoad={() => handleImageLoad(`category-${category.id}`)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Sign up now to get exclusive deals, track your orders, and enjoy a personalized experience.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button className="w-full sm:w-auto px-8 py-6 text-lg bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg">
                  Browse Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
