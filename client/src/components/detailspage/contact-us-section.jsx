import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ContactUsSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const [formData, setFormData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    let parsedUser = {};
    if (storedUser) {
      parsedUser = JSON.parse(storedUser);
    }
    return {
      name: parsedUser.firstName ? `${parsedUser.firstName} ${parsedUser.lastName || ''}`.trim() : "",
      email: parsedUser.email || "",
      // User ගේ අංකය LocalStorage එකෙන් ගන්නවා. UI එකේ පෙන්නුවේ නැති වුණාට මැසේජ් එකට මේක යනවා.
      phoneNumber: parsedUser.phoneNumber || "0773401552", 
      subject: "",
      message: ""
    };
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // බට්න් එක දෙපාරක් ක්ලික් වුණොත් Tab 2ක් ඕපන් වෙන එක නවත්වන්න මේක දැම්මා 👇
    if (isSubmitting) return; 
    
    setIsSubmitting(true);

    // 1. මැසේජ් එක යන්න ඕන අංකය
    const destinationNumber = "+94773401552"; 

    // 2. WhatsApp එකට යවන මැසේජ් එක
    const textMessage = `*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A%0A*Message:*%0A${formData.message}`;

    // 3. WhatsApp Web / App ලින්ක් එක
    const whatsappUrl = `https://wa.me/${destinationNumber}?text=${textMessage}`;

    // 4. එක අලුත් Tab එකක් විතරක් Open වෙන්න නමක් දීලා ඕපන් කරනවා 👇
    window.open(whatsappUrl, "whatsappWindow");

    // 5. UI එකේ Success මැසේජ් එක පෙන්වනවා
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData(prev => ({ ...prev, subject: "", message: "" }));
      }, 5000);
    }, 1000);
  };

  return (
    <section className="py-5 md:py-10 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Need more help? Reach out to our support team and we'll get back to you within 1 hour.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Google Map */}
        <div className="lg:col-span-5 bg-card rounded-2xl border shadow-sm p-2 flex flex-col h-[400px] lg:h-full min-h-[450px]">
          <iframe
            title="Store Location"
            src="https://maps.google.com/maps?q=Galle%20Road,%20Colombo,%20Sri%20Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }} 
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl w-full h-full object-cover"
          ></iframe>
        </div>

        {/* Right Side: Contact Form or Login Prompt */}
        <div className="lg:col-span-7 bg-card rounded-2xl border shadow-sm p-6 md:p-8 flex flex-col h-full justify-center">
          <h3 className="text-xl font-bold mb-6">Send us a Message</h3>

          {!isLoggedIn ? (
            <div className="flex flex-col items-center justify-center text-center py-10 h-full">
              <div className="h-16 w-16 bg-muted text-muted-foreground rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">Login Required</h4>
              <p className="text-muted-foreground max-w-sm mb-6">
                You need to be logged in to send us a message. Please sign in or create an account to get in touch.
              </p>
              <Button 
                onClick={() => window.location.href = "/signin"} 
                className="px-8 gap-2 h-11"
              >
                <LogIn className="h-4 w-4" /> Sign In
              </Button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for contacting us. Our team will get back to you via email shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field>
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="h-11 bg-background" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required className="h-11 bg-background" />
                    </Field>
                  </div>

                  {/* Phone Number Field එක මෙතනින් අයින් කළා. Subject එක විතරක් පෙන්වනවා 👇 */}
                  <Field>
                    <FieldLabel htmlFor="subject">Subject</FieldLabel>
                    <Input id="subject" placeholder="How can we help you?" value={formData.subject} onChange={handleChange} required className="h-11 bg-background" />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <textarea 
                      id="message" 
                      placeholder="Write your message here..." 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      rows="5"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none" 
                    ></textarea>
                  </Field>

                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto h-11 px-8 gap-2">
                    {isSubmitting ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          )}

        </div>
      </div>
    </section>
  );
}