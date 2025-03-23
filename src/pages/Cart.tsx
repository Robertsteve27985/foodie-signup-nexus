
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, ArrowLeft, Trash, Plus, Minus } from "lucide-react";
import { CartItem, getCart, updateCartItemQuantity, removeFromCart } from "@/utils/cartUtils";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load cart items
    setCartItems(getCart());
    setIsLoading(false);
  }, []);
  
  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    updateCartItemQuantity(itemId, newQuantity);
    setCartItems(getCart());
    
    // Dispatch custom event to update cart count in NavBar
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
    setCartItems(getCart());
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
    
    // Dispatch custom event to update cart count in NavBar
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Proceeding to checkout...",
    });
    // In a real app, this would redirect to a checkout page
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 animate-pulse">
          <div className="max-w-3xl mx-auto">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
            {/* Loading skeleton */}
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center justify-between animate-fade-in">
            <Link to="/menu" className="text-sm text-primary hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-xl animate-scale-in">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-2 text-primary" />
              Your Cart
            </h1>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">Your cart is empty</p>
                <Link to="/menu">
                  <Button>Browse Menu</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-border last:border-0">
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/food/${item.id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <Input
                          type="number"
                          min="1"
                          className="w-12 text-center mx-1 p-1 h-8"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                        />
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-right min-w-[80px]">
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm flex items-center mt-1"
                        >
                          <Trash className="h-3 w-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-4"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
