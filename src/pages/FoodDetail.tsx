import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Heart,
  Info,
  Utensils
} from "lucide-react";
import { addToCart } from "@/utils/cartUtils";

// Sample food data
const FOODS = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    longDescription: "Our Margherita Pizza is a tribute to the classic Italian favorite. Made with our signature tomato sauce, fresh mozzarella cheese, and topped with fragrant basil leaves. The crust is hand-stretched and baked to perfection in our wood-fired oven, giving it that authentic smoky flavor and perfect crispy-yet-chewy texture.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Pizza",
    prepTime: "15-20 min",
    rating: 4.8,
    tags: ["vegetarian", "italian"],
    ingredients: ["Homemade Pizza Dough", "San Marzano Tomato Sauce", "Fresh Mozzarella", "Fresh Basil", "Extra Virgin Olive Oil", "Salt"],
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 36,
      fat: 10
    }
  },
  {
    id: 2,
    name: "Chicken Alfredo Pasta",
    description: "Creamy pasta with grilled chicken and parmesan cheese",
    longDescription: "Our Chicken Alfredo Pasta features perfectly cooked fettuccine noodles coated in a rich, creamy sauce made with real butter, fresh cream, and aged Parmesan cheese. Topped with tender grilled chicken breast that's been marinated in Italian herbs and spices. Every bite delivers the perfect balance of flavor and comfort.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Pasta",
    prepTime: "20-25 min",
    rating: 4.6,
    tags: ["chicken", "italian"],
    ingredients: ["Fettuccine Pasta", "Grilled Chicken Breast", "Heavy Cream", "Butter", "Parmesan Cheese", "Garlic", "Italian Seasonings", "Black Pepper"],
    nutrition: {
      calories: 450,
      protein: 28,
      carbs: 40,
      fat: 22
    }
  },
  {
    id: 3,
    name: "Beef Burger",
    description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
    longDescription: "Our signature Beef Burger starts with a 1/3 pound patty of premium ground beef, seasoned with our special blend of spices and grilled to perfection. It's topped with melted American cheese, crisp lettuce, ripe tomato slices, and our secret special sauce, all sandwiched between a freshly baked brioche bun. Served with a side of golden crispy fries.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Burger",
    prepTime: "10-15 min",
    rating: 4.5,
    tags: ["beef", "american"],
    ingredients: ["Beef Patty (1/3 lb)", "Brioche Bun", "American Cheese", "Lettuce", "Tomato", "Red Onion", "Pickle", "Special Sauce"],
    nutrition: {
      calories: 560,
      protein: 30,
      carbs: 45,
      fat: 32
    }
  },
  {
    id: 4,
    name: "Vegetable Stir Fry",
    description: "Fresh vegetables stir-fried with tofu in a savory sauce",
    longDescription: "Our Vegetable Stir Fry is a colorful medley of fresh, crisp vegetables and firm tofu cubes, quickly cooked in a hot wok to preserve their nutrients and texture. Everything is coated in our house-made savory sauce that blends soy, ginger, and garlic. Served over a bed of steamed jasmine rice for a satisfying, healthy meal that doesn't compromise on flavor.",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Asian",
    prepTime: "15-20 min",
    rating: 4.3,
    tags: ["vegetarian", "vegan", "asian"],
    ingredients: ["Firm Tofu", "Broccoli", "Carrots", "Bell Peppers", "Snap Peas", "Shiitake Mushrooms", "Jasmine Rice", "House Stir Fry Sauce"],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 42,
      fat: 10
    }
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled to perfection with lemon herb sauce",
    longDescription: "Our Grilled Salmon features a premium cut of wild-caught Atlantic salmon, lightly seasoned and grilled to perfection to enhance its natural flavors. It's topped with our signature lemon herb sauce made with fresh herbs, lemon zest, and a touch of butter. Served with roasted seasonal vegetables and a choice of rice pilaf or garlic mashed potatoes.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Seafood",
    prepTime: "20-25 min",
    rating: 4.7,
    tags: ["seafood", "healthy"],
    ingredients: ["Wild-Caught Salmon Fillet", "Lemon", "Fresh Herbs", "Butter", "Garlic", "Seasonal Vegetables", "Rice Pilaf or Mashed Potatoes"],
    nutrition: {
      calories: 380,
      protein: 35,
      carbs: 25,
      fat: 16
    }
  },
  {
    id: 6,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with croutons, parmesan, and Caesar dressing",
    longDescription: "Our Caesar Salad starts with crisp hearts of romaine lettuce, hand-torn into bite-sized pieces. It's topped with our house-made garlic croutons, freshly shaved Parmesan cheese, and tossed in our creamy Caesar dressing. Our dressing is made from scratch daily using real anchovy fillets, garlic, egg yolks, Dijon mustard, and extra virgin olive oil for an authentic taste that sets it apart.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    category: "Salad",
    prepTime: "5-10 min",
    rating: 4.2,
    tags: ["salad", "healthy"],
    ingredients: ["Romaine Lettuce", "House-made Croutons", "Parmesan Cheese", "Caesar Dressing", "Fresh Ground Black Pepper"],
    nutrition: {
      calories: 230,
      protein: 8,
      carbs: 15,
      fat: 17
    }
  }
];

// Get recommended foods based on current food
const getRecommendedFoods = (currentFood: any) => {
  // In a real app, this would be more sophisticated, perhaps based on categories or user preferences
  return FOODS.filter(food => food.id !== currentFood.id).slice(0, 3);
};

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [food, setFood] = useState<any>(null);
  const [recommendedFoods, setRecommendedFoods] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Fetch food detail
  useEffect(() => {
    const fetchFood = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find the food by ID
        const foundFood = FOODS.find(f => f.id === Number(id));
        
        if (foundFood) {
          setFood(foundFood);
          setRecommendedFoods(getRecommendedFoods(foundFood));
        } else {
          // Handle not found
          toast({
            variant: "destructive",
            title: "Not found",
            description: "The requested food item could not be found.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load food details.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchFood();
    }
  }, [id, toast]);
  
  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const addToCart = () => {
    if (!food) return;
    
    // Add the item to cart
    const cartItem = {
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: quantity,
      image: food.image
    };
    
    // Call the addToCart function from cartUtils
    addToCart(cartItem);
    
    // Show success toast
    toast({
      title: "Added to cart",
      description: `${quantity}x ${food.name} added to your cart`,
    });
    
    // Dispatch custom event to update cart count in NavBar
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      toast({
        title: "Added to favorites",
        description: `${food.name} has been added to your favorites`,
      });
    }
  };
  
  // Image loading handler
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // Loading skeleton
  if (isLoading || !food) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 animate-pulse">
          <div className="max-w-4xl mx-auto">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
            
            <div className="glass-card p-6 md:p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg mt-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between animate-fade-in">
            <Link to="/menu" className="text-sm text-primary hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Menu
            </Link>
            
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{food.rating}</span>
              <span className="text-sm text-muted-foreground">/ 5</span>
            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-xl animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className={`w-full h-64 md:h-80 object-cover ${
                    imageLoaded ? "img-loaded" : "img-loading"
                  }`}
                  onLoad={handleImageLoad}
                />
                
                <button
                  onClick={toggleFavorite}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    isFavorite 
                      ? "bg-red-500 text-white" 
                      : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90"
                  } transition-all duration-200`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-white" : ""}`} />
                </button>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex justify-between items-center">
                    <Badge className="bg-primary text-primary-foreground py-1">
                      ${food.price.toFixed(2)}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-white" />
                      <span className="text-white text-sm">{food.prepTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{food.name}</h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {food.category}
                    </Badge>
                    {food.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground">{food.description}</p>
                
                <div className="flex items-center mt-6">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 border border-border rounded-l-lg hover:bg-secondary transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="px-4 py-2 border-t border-b border-border min-w-[3rem] text-center">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 border border-border rounded-r-lg hover:bg-secondary transition-colors"
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  
                  <span className="ml-4 text-lg font-semibold">
                    ${(food.price * quantity).toFixed(2)}
                  </span>
                </div>
                
                <Button
                  onClick={addToCart}
                  className="w-full btn-primary mt-4"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Tabs for additional information */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex space-x-1 border-b border-border">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "description"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "ingredients"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("nutrition")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "nutrition"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Nutrition
                </button>
              </div>
              
              <div className="py-4">
                {activeTab === "description" && (
                  <p className="text-muted-foreground">{food.longDescription}</p>
                )}
                
                {activeTab === "ingredients" && (
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {food.ingredients.map((ingredient: string) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                )}
                
                {activeTab === "nutrition" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-3 bg-secondary rounded-lg text-center">
                      <span className="text-sm text-muted-foreground">Calories</span>
                      <p className="font-bold">{food.nutrition.calories}</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg text-center">
                      <span className="text-sm text-muted-foreground">Protein</span>
                      <p className="font-bold">{food.nutrition.protein}g</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg text-center">
                      <span className="text-sm text-muted-foreground">Carbs</span>
                      <p className="font-bold">{food.nutrition.carbs}g</p>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg text-center">
                      <span className="text-sm text-muted-foreground">Fat</span>
                      <p className="font-bold">{food.nutrition.fat}g</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Important Order Information */}
          <div className="mt-8 glass-card p-6 rounded-xl animate-slide-up">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Order Information</h3>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    You can cancel your order within 10 minutes of placing it.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Food preparation takes approximately 20 minutes.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Delivery time ranges from 10-30 minutes depending on your location.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Recommended Foods */}
          {recommendedFoods.length > 0 && (
            <div className="mt-12 animate-slide-up">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Utensils className="h-6 w-6 mr-2 text-primary" />
                You Might Also Like
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedFoods.map((item) => (
                  <Link to={`/food/${item.id}`} key={item.id}>
                    <div className="food-card h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden rounded-t-xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <Badge className="bg-primary text-primary-foreground">
                            ${item.price.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold line-clamp-1">{item.name}</h3>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FoodDetail;
