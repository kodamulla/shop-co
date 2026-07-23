import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/users/signin", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // 👇 සාර්ථක වුණාම Success Toast එක පෙන්නනවා 👇
      toast.success("Login successful!", { id: "login-success" });

      // 👇 Toast එක පේන්න තත්පර 1ක් ඉඳලා Page එක මාරු කරනවා 👇
      setTimeout(() => {
        const userRole = response.data.user.role; 

        if (userRole === "manager") {
          window.location.href = "/managerdashboard"; 
        } else if (userRole === "admin") {
          window.location.href = "/admindashboard"; 
        } else {
          window.location.href = "/"; 
        }
      }, 1000);
      
    } catch (err) {
      toast.error("Invalid email or password", { id: "login-error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
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
              placeholder="kasun@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background h-10" />
          </Field>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a href="#" className="ml-auto text-xs underline-offset-4 hover:underline hover:bg-black hover:text-white px-1 py-0.5 rounded transition-colors duration-200">
                Forgot your password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="********" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background h-10" />
          </Field>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Field>
            <Button disabled={loading} className="h-10 bg-black hover:bg-black hover:text-white border hover:border-black" type="submit">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Field>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FieldSeparator>Or continue with</FieldSeparator>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
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
            <FieldDescription className="text-center mt-2">
              Don&apos;t have an account?{" "}
              <a 
                href="/signup" 
                className="underline underline-offset-4 text-black hover:bg-black hover:!text-white px-2 py-0.5 rounded transition-colors duration-200"
              >
                Sign up 
              </a>
            </FieldDescription>
          </Field>
        </motion.div>
      </FieldGroup>
    </form>
  );
}