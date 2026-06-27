import { LoginForm } from "@/components/signin/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-5">
      
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-3">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* href එක "/" විදිහට වෙනස් කළා Home යන්න 👇 */}
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md text-primary-foreground">
                <img 
                    src="/Logoicon.png" 
                    alt="Logo" 
                    className="size-8 rounded-md object-contain" 
                />
            </div>
            ShopCo
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
          // Login එකට ගැළපෙන අලුත් High-Quality Image Link එක 👇
          src="/signin.png"
          alt="ShopCo Fashion Style"
          // පින්තූරය ලස්සන වෙන්න rounded-2xl සහ shadow එකතු කළා 👇
          className="absolute inset-0 m-auto h-[80%] w-[80%] lg:mr-30 xl:mr-40 object-cover mt-20 rounded-2xl shadow-2xl"
        />
      </div>
      
    </div>
  );
}