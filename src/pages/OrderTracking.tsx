
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Clock,
  ChefHat,
  Bike,
  Package,
  CheckCircle,
  X,
  ArrowLeft,
  MapPin,
  PhoneCall,
  User
} from "lucide-react";

// Sample order data
const ORDER = {
  id: "ORD-12345",
  date: new Date().toISOString(),
  status: "preparing", // Possible values: "placed", "preparing", "delivering", "delivered", "cancelled"
  items: [
    {
      id: 1,
      name: "Margherita Pizza",
      quantity: 1,
      price: 12.99,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Beef Burger",
      quantity: 2,
      price: 10.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    }
  ],
  delivery: {
    address: "123 Main St, City, Country",
    fee: 2.99,
    estimated_time: "10-30 minutes"
  },
  subtotal: 34.97,
  tax: 2.87,
  total: 40.83,
  orderTime: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
  preparationTime: 20, // minutes
  canBeCancelled: true,
  restaurant: {
    name: "FoodieNexus Kitchen",
    address: "456 Restaurant Ave, City, Country",
    phone: "+1 234 567 890"
  },
  driver: {
    name: "Mike Wilson",
    phone: "+1 987 654 321",
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  }
};

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  
  // Fetch order data
  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, you'd fetch the order by ID
        setOrder(ORDER);
        
        // Calculate time remaining for cancellation (10 minutes from order time)
        const orderTime = new Date(ORDER.orderTime).getTime();
        const cancelCutoff = orderTime + 10 * 60 * 1000; // 10 minutes in milliseconds
        const now = Date.now();
        
        if (now < cancelCutoff) {
          setTimeRemaining(Math.floor((cancelCutoff - now) / 1000));
        } else {
          setTimeRemaining(0);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load order details.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchOrder();
    }
  }, [id, toast]);
  
  // Countdown timer for cancellation window
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => (prev !== null && prev > 0) ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleCancelOrder = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the order status
      setOrder({ ...order, status: "cancelled" });
      
      toast({
        title: "Order cancelled",
        description: "Your order has been successfully cancelled.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to cancel order. Please try again.",
      });
    }
  };
  
  // Loading skeleton
  if (isLoading || !order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 animate-pulse">
          <div className="max-w-3xl mx-auto">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
            
            <div className="glass-card p-6 rounded-xl mb-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 mb-6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg mb-6"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2 mb-6"></div>
              <div className="space-y-4">
                <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Define steps based on order status
  const steps = [
    { 
      id: "placed", 
      title: "Order Placed", 
      description: "Your order has been received",
      icon: Package,
      completed: ["placed", "preparing", "delivering", "delivered"].includes(order.status),
      current: order.status === "placed"
    },
    { 
      id: "preparing", 
      title: "Preparing", 
      description: `Food preparation takes about ${order.preparationTime} minutes`,
      icon: ChefHat,
      completed: ["preparing", "delivering", "delivered"].includes(order.status),
      current: order.status === "preparing"
    },
    { 
      id: "delivering", 
      title: "Out for Delivery", 
      description: `Estimated delivery time: ${order.delivery.estimated_time}`,
      icon: Bike,
      completed: ["delivering", "delivered"].includes(order.status),
      current: order.status === "delivering"
    },
    { 
      id: "delivered", 
      title: "Delivered", 
      description: "Enjoy your meal!",
      icon: CheckCircle,
      completed: ["delivered"].includes(order.status),
      current: order.status === "delivered"
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center justify-between animate-fade-in">
            <Link to="/" className="text-sm text-primary hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            
            <span className="text-sm">
              Order ID: <span className="font-semibold">{order.id}</span>
            </span>
          </div>
          
          {/* Order Status Card */}
          <div className="glass-card p-6 md:p-8 rounded-xl mb-8 animate-scale-in">
            <h1 className="text-2xl font-bold mb-2">
              {order.status === "cancelled" ? "Order Cancelled" : "Track Your Order"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {order.status === "cancelled"
                ? "Your order has been cancelled."
                : `Ordered on ${new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}`
              }
            </p>
            
            {order.status !== "cancelled" && (
              <>
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center relative">
                        {/* Connecting line */}
                        {index < steps.length - 1 && (
                          <div className={`absolute h-0.5 w-full right-0 top-5 transform translate-x-1/2 ${
                            step.completed ? "bg-primary" : "bg-secondary"
                          }`}></div>
                        )}
                        
                        {/* Step icon */}
                        <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                          step.completed || step.current
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        
                        {/* Step details */}
                        <div className="mt-2 text-center">
                          <p className={`text-xs font-medium ${
                            step.current ? "text-primary" : ""
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-muted-foreground hidden md:block mt-1 max-w-[120px]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Cancellation button */}
                {timeRemaining !== null && timeRemaining > 0 && order.canBeCancelled && order.status !== "cancelled" && (
                  <div className="border border-border rounded-lg p-4 bg-secondary/50 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Cancellation window</p>
                        <p className="text-sm text-muted-foreground">
                          You can cancel your order for: <span className="font-semibold text-primary">{formatTime(timeRemaining)}</span>
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        onClick={handleCancelOrder}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel Order
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Delivery Information */}
                {order.status === "delivering" && (
                  <div className="border border-border rounded-lg p-4 bg-secondary/50 mt-6">
                    <h3 className="font-medium mb-3">Delivery Information</h3>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img 
                          src={order.driver.photo} 
                          alt={order.driver.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{order.driver.name}</p>
                        <p className="text-sm text-muted-foreground">Your delivery driver</p>
                      </div>
                      <a 
                        href={`tel:${order.driver.phone}`}
                        className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                      >
                        <PhoneCall className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Order Details */}
          <div className="glass-card p-6 md:p-8 rounded-xl animate-scale-in">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            
            {/* Delivery Info */}
            <div className="flex items-start space-x-3 mb-6 pb-6 border-b border-border">
              <div className="bg-secondary p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-muted-foreground">{order.delivery.address}</p>
              </div>
            </div>
            
            {/* Restaurant Info */}
            <div className="flex items-start space-x-3 mb-6 pb-6 border-b border-border">
              <div className="bg-secondary p-2 rounded-full">
                <Utensils className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{order.restaurant.name}</p>
                <p className="text-muted-foreground">{order.restaurant.address}</p>
                <a 
                  href={`tel:${order.restaurant.phone}`}
                  className="text-primary text-sm hover:underline mt-1 inline-block"
                >
                  {order.restaurant.phone}
                </a>
              </div>
            </div>
            
            {/* Order Items */}
            <h3 className="font-medium mb-4">Items</h3>
            <div className="space-y-4 mb-6">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${order.delivery.fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-lg border-t border-border mt-2">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;
