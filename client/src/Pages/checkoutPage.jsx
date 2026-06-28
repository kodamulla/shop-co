import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/landingpage/navbar";
import { Footer } from "@/components/landingpage/footer";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Profile එකේ තියෙන ඩේටා වලින් Shipping Details Initial State එකේදීම පුරවනවා (Error එක එන්නේ නැති වෙන්න)
  const [formData, setFormData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    let parsedUser = {};
    if (storedUser) {
      parsedUser = JSON.parse(storedUser);
    }
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
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: ""
    };
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // මෙතනින් Payment Gateway API Call එක ලියන්න පුළුවන්
    // දැනට තත්පර 2කින් Order එක සාර්ථක වුණා කියලා පෙන්වනවා
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
    }, 2000);
  };

  // Dummy Order Summary (Cart එකෙන් එන්න ඕනේ දත්ත)
  const subtotal = 565.00;
  const discount = 113.00;
  const deliveryFee = 15.00;
  const total = subtotal - discount + deliveryFee;

  // Order එක Success වුණාම පෙන්වන UI එක
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/20 font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border shadow-lg p-8 md:p-12 max-w-md w-full text-center"
          >
            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Order Successful!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been placed and is being processed. We will send you an email confirmation shortly.
            </p>
            <Button size="lg" className="w-full h-12" onClick={() => window.location.href = "/"}>
              Continue Shopping
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20 font-sans">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground uppercase tracking-tight">
            Checkout
          </h1>
        </motion.div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Forms */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            
            {/* 1. Shipping Information */}
            <div className="bg-card rounded-2xl border shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <Truck className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">Shipping Information</h2>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <Input id="firstName" value={formData.firstName} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input id="lastName" value={formData.lastName} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                    <Input id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                  <Field className="md:col-span-1">
                    <FieldLabel htmlFor="addressNo">No / Apt</FieldLabel>
                    <Input id="addressNo" value={formData.addressNo} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                  <Field className="md:col-span-2">
                    <FieldLabel htmlFor="street">Street Address</FieldLabel>
                    <Input id="street" value={formData.street} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Field>
                    <FieldLabel htmlFor="city">City</FieldLabel>
                    <Input id="city" value={formData.city} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="zipCode">Zip Code</FieldLabel>
                    <Input id="zipCode" value={formData.zipCode} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="country">Country</FieldLabel>
                    <Input id="country" value={formData.country} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-card rounded-2xl border shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  <Lock className="h-3.5 w-3.5" /> Secure
                </div>
              </div>

              <div className="space-y-5">
                <Field>
                  <FieldLabel htmlFor="nameOnCard">Name on Card</FieldLabel>
                  <Input id="nameOnCard" placeholder="Adithya Semina" value={formData.nameOnCard} onChange={handleChange} required className="h-11 bg-background" />
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="cardNumber">Card Number</FieldLabel>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" maxLength="19" value={formData.cardNumber} onChange={handleChange} required className="h-11 bg-background tracking-widest" />
                </Field>

                <div className="grid grid-cols-2 gap-5">
                  <Field>
                    <FieldLabel htmlFor="expiryDate">Expiry Date</FieldLabel>
                    <Input id="expiryDate" placeholder="MM/YY" maxLength="5" value={formData.expiryDate} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                    <Input id="cvv" placeholder="123" maxLength="4" type="password" value={formData.cvv} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <div className="bg-card rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm md:text-base mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount</span>
                  <span className="font-medium text-red-500">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-foreground">${deliveryFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4 mt-4 flex justify-between items-center">
                  <span className="text-base md:text-lg font-bold">Total</span>
                  <span className="text-xl md:text-2xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg mb-6">
                <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>Your payment information is encrypted and secure.</span>
              </div>

              <Button 
                type="submit" 
                disabled={isProcessing} 
                className="w-full h-14 text-base font-semibold gap-2 rounded-xl"
              >
                {isProcessing ? "Processing Payment..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </motion.div>

        </form>
      </main>

      <Footer />
    </div>
  );
}