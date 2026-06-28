import { useState } from "react";
import axios from "axios";
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

export function SignupForm({ className, ...props }) {
  // 1. Form Data සඳහා States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Input වෙනස් වෙද්දී State එක අප්ඩේට් කිරීම
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. Form Submit කිරීම
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
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
        alert("Account created successfully!");
        window.location.href = "/signin"; // සාර්ථක වුණාම Login පිටුවට යවනවා
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Form එක Submit වෙද්දී handleSubmit function එක වැඩ කරන්න හැදුවා 👇
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Error Message පෙන්වීම 👇 */}
        {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}

        <div className="grid grid-cols-2 gap-3">
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
        </div>

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
        <Field>
          <FieldLabel htmlFor="phoneNumber">Contact Number</FieldLabel>
          <Input
            id="phoneNumber" // Backend එකට ගැළපෙන්න ID එක වෙනස් කළා
            type="tel"
            placeholder="0771234567"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="bg-background h-10" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
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
        </div>
        <Field>
          <Button type="submit" disabled={loading} className=" h-10">
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>
        
        {/* ... (Google Login & Bottom text අර විදිහටම තියෙනවා) ... */}
        <FieldSeparator>Or continue with</FieldSeparator>
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
            Already have an account? <a href="/signin">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}