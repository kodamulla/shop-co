import { LoginForm } from "@/components/signin/login-form";
import { Toaster } from "react-hot-toast"; // 👈 අලුතින් එකතු කළා

export default function LoginPage() {
  return (
    <>
      <Toaster position="top-right" />
      
      <div className="grid min-h-svh lg:grid-cols-5">
        
        <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-3">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="flex items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md text-primary-foreground">
                  <img 
                      src="/Logoicon.png" 
                      alt="Logo" 
                      className="size-8 rounded-md object-contain" 
                  />
              </div>
              <div className="text-lg font-bold">ShopCo </div>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs lg:scale-110 md:scale-110 lg:origin-center">
              <LoginForm />
            </div>
          </div>
        </div>
        
        <div className="relative hidden lg:col-span-2 lg:block">
          <img
            src="/signin.png"
            alt="ShopCo Fashion Style"
            className="absolute inset-0 m-auto h-[80%] w-[80%] lg:mr-30 xl:mr-40 object-cover mt-20 rounded-2xl shadow-2xl"
          />
        </div>
        
      </div>
    </>
  );
}