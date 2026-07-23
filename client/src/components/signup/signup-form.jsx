import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion"; 

export function SignupForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      return toast.error("Please enter a valid email address!", { id: "signup-error" });
    }

    if (!/^\d+$/.test(formData.phoneNumber)) {
      return toast.error("Contact Number must contain only numbers!", { id: "signup-error" });
    }

    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long!", { id: "signup-error" });
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!", { id: "signup-error" });
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      if (response.status === 201) {
        // 👇 සාමාන්‍ය alert එක අයින් කරලා toast.success එක දැම්මා 👇
        toast.success("Account created successfully!", { id: "signup-success" });
        
        // 👇 Toast එක පේන්න තත්පර 1.5ක් ඉඳලා Login එකට යන්න හැදුවා 👇
        setTimeout(() => {
          window.location.href = "/signin"; 
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.", { id: "signup-error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <Field>
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
            <Input
              id="firstName"
              type="text"
              placeholder="Adithya"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="bg-background h-10" />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
            <Input
              id="lastName"
              type="text"
              placeholder="Semina"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="bg-background h-10" />
          </Field>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="adithya@gmail.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-background h-10" />
          </Field>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Field>
            <FieldLabel htmlFor="phoneNumber">Contact Number</FieldLabel>
            <Input
              id="phoneNumber" 
              type="tel"
              placeholder="0771234567"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-background h-10" />
          </Field>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 gap-3"
        >
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input 
              id="password" 
              placeholder="********" 
              type="password" 
              required 
              value={formData.password}
              onChange={handleChange}
              className="bg-background h-10" />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input 
              id="confirmPassword" 
              placeholder="********" 
              type="password" 
              required 
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-background h-10" />
          </Field>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Field>
            <Button type="submit" disabled={loading} className=" h-10 bg-black hover:bg-black hover:text-white border hover:border-black">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Field>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <FieldSeparator>Or continue with</FieldSeparator>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Field>
            <Button variant="outline" type="button" className="gap-2 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Login with Google
          </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account? <a href="/signin" className="underline underline-offset-4 text-black hover:bg-black hover:!text-white ">Sign in</a>
            </FieldDescription>
          </Field>
        </motion.div>

      </FieldGroup>
    </form>
  );
}