
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Clock,
  ShoppingBag
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  name: string;
  email: string;
  address: string;
  telephone: string;
}

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, City, Country",
    telephone: "+1 234 567 890"
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>({...profile});
  
  // Orders history dummy data
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      date: "2023-06-10",
      total: 32.99,
      status: "Delivered"
    },
    {
      id: "ORD-002",
      date: "2023-06-01",
      total: 18.50,
      status: "Delivered"
    },
    {
      id: "ORD-003",
      date: "2023-05-25",
      total: 24.75,
      status: "Delivered"
    }
  ]);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
    
    // In a real app, you would fetch the user profile here
    // const fetchProfile = async () => {
    //   try {
    //     const response = await fetch('/api/profile', {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });
    //     
    //     if (!response.ok) throw new Error('Failed to fetch profile');
    //     const data = await response.json();
    //     setProfile(data);
    //     setEditedProfile(data);
    //   } catch (error) {
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: "Failed to load profile data.",
    //     });
    //   }
    // };
    //
    // fetchProfile();
  }, [navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedProfile({...profile});
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd make an API call to your backend
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify(editedProfile),
      // });
      
      // if (!response.ok) throw new Error('Failed to update profile');
      
      setProfile(editedProfile);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="md:col-span-1">
            <div className="glass-card p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditToggle}
                  className="text-primary"
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-primary/10 rounded-full p-6">
                    <User className="h-20 w-20 text-primary" />
                  </div>
                </div>
                
                {isEditing ? (
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-muted-foreground">
                          <User className="h-5 w-5" />
                        </div>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={editedProfile.name}
                          onChange={handleChange}
                          className="pl-10 form-input"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-muted-foreground">
                          <Mail className="h-5 w-5" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={handleChange}
                          className="pl-10 form-input"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-muted-foreground">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          value={editedProfile.address}
                          onChange={handleChange}
                          className="pl-10 form-input"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="telephone" className="text-sm font-medium">
                        Telephone
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-muted-foreground">
                          <Phone className="h-5 w-5" />
                        </div>
                        <Input
                          id="telephone"
                          name="telephone"
                          type="tel"
                          value={editedProfile.telephone}
                          onChange={handleChange}
                          className="pl-10 form-input"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="button"
                      onClick={handleSave}
                      className="w-full btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-1" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{profile.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{profile.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Telephone</p>
                        <p className="font-medium">{profile.telephone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Orders and Activity */}
          <div className="md:col-span-2">
            <div className="glass-card p-6 animate-scale-in">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-primary" />
                Order History
              </h2>
              
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border border-border rounded-lg p-4 transition-all hover:shadow-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <ShoppingBag className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">{order.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${order.total.toFixed(2)}</div>
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 mt-1">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Your order history will appear here once you start ordering.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
