import { useState, useEffect } from "react";
import axios from "axios"; // අලුතින් import කළා
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Shield,
  Camera, 
  Save,
  Edit,
  MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Navbar එක Import කරගත්තා
import { Navbar } from "@/components/landingpage/navbar"; 

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [formData, setFormData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return {
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        email: parsedUser.email || "",
        phoneNumber: parsedUser.phoneNumber || "",
        addressNo: parsedUser.addressNo || "",
        street: parsedUser.street || "",
        city: parsedUser.city || "",
        zipCode: parsedUser.zipCode || "",
        country: parsedUser.country || "",
      };
    }
    return {
      firstName: "", lastName: "", email: "", phoneNumber: "",
      addressNo: "", street: "", city: "", zipCode: "", country: ""
    };
  });

  useEffect(() => {
    if (!user) {
      window.location.href = "/signin";
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Database එකට සේව් කරන අලුත් Function එක 👇
  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.put(
        `http://localhost:5000/api/users/update-profile/${user.id}`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );

      // Backend එකෙන් එන අලුත් User විස්තර ටික ආයෙත් LocalStorage එකේ සේව් කරනවා
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setIsEditing(false);
      alert("Profile updated successfully!");
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-muted/30 py-10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <p className="text-muted-foreground mt-1">Manage your profile information and address.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
              <div className="bg-card text-card-foreground rounded-2xl border shadow-sm p-6 flex flex-col items-center text-center">
                
                <div className="relative mb-4 group cursor-pointer">
                  <div className="h-28 w-28 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary border-4 border-background shadow-md">
                    {initials}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h2 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h2>
                <div className="flex items-center gap-1.5 mt-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium text-muted-foreground capitalize">{user.role} Account</span>
                </div>

                <div className="w-full mt-6 space-y-3 pt-6 border-t">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-foreground/70 flex-shrink-0" />
                    <span className="truncate">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-foreground/70 flex-shrink-0" />
                    <span>{formData.phoneNumber}</span>
                  </div>
                  {formData.city && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground text-left">
                      <MapPin className="h-4 w-4 text-foreground/70 flex-shrink-0" />
                      <span>{formData.street}, {formData.city}</span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
              <div className="bg-card text-card-foreground rounded-2xl border shadow-sm p-6 md:p-8">
                
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Personal Information</h3>
                  <Button 
                    variant={isEditing ? "outline" : "default"} 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2"
                  >
                    {isEditing ? "Cancel" : <><Edit className="h-4 w-4" /> Edit Profile</>}
                  </Button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field>
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input id="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} className={`h-11 ${!isEditing ? 'bg-muted/50 border-transparent cursor-not-allowed' : 'bg-background'}`} />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                      <Input id="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} className={`h-11 ${!isEditing ? 'bg-muted/50 border-transparent cursor-not-allowed' : 'bg-background'}`} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <Input id="email" type="email" value={formData.email} disabled={true} className="h-11 bg-muted/50 border-transparent cursor-not-allowed text-muted-foreground" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                      <Input id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} disabled={!isEditing} className={`h-11 ${!isEditing ? 'bg-muted/50 border-transparent cursor-not-allowed' : 'bg-background'}`} />
                    </Field>
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4">Address Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Field className="md:col-span-1">
                        <FieldLabel htmlFor="addressNo">No / Apt</FieldLabel>
                        <Input id="addressNo" placeholder="123/A" value={formData.addressNo} onChange={handleChange} disabled={!isEditing} className={`h-11 ${!isEditing ? 'bg-muted/50 border-transparent cursor-not-allowed' : 'bg-background'}`} />
                      </Field>
                      <Field className="md:col-span-2">
                        <FieldLabel htmlFor="street">Street Address</FieldLabel>
                        <Input id="street" placeholder="Galle Road" value={formData.street} onChange={handleChange} disabled={!isEditing} className={`h-11 ${!isEditing ? 'bg-muted/50 border-transparent cursor-not-allowed' : 'bg-background'}`} />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Field>
                        <FieldLabel htmlFor="city">City</FieldLabel>
                        <Input id="city" placeholder="Colombo" value={formData.city} onChange={handleChange} disabled={!isEditing} className={`h-11 ${!isEditing ? 'bg-muted/50 border-transparent cursor-not-allowed' : 'bg-background'}`} />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="zipCode">Zip / Postal Code</FieldLabel>
                        <Input id="zipCode" placeholder="00100" value={formData.zipCode} onChange={handleChange} disabled={!isEditing} className={`h-11 ${!isEditing ? 'bg-muted/50 border-transparent cursor-not-allowed' : 'bg-background'}`} />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="country">Country</FieldLabel>
                        <Input id="country" placeholder="Sri Lanka" value={formData.country} onChange={handleChange} disabled={!isEditing} className={`h-11 ${!isEditing ? 'bg-muted/50 border-transparent cursor-not-allowed' : 'bg-background'}`} />
                      </Field>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isEditing && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pt-2">
                        <Button type="submit" className="w-full md:w-auto h-11 px-8 gap-2">
                          <Save className="h-4 w-4" /> Save Changes
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}