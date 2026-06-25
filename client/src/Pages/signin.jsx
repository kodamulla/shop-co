import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    // 1. තීරු 5 කට බෙදුවා
    <div className="grid min-h-svh lg:grid-cols-5">
      
      {/* 2. වම් පැත්තට තීරු 3ක් දුන්නා (60%) */}
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-3">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md text-primary-foreground">
                <img 
                    src="/logowhitezoom.svg" 
                    alt="Logo" 
                    className="size-8 rounded-md object-contain" 
                />
            </div>
            ShopCo
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs lg:scale-120 md:scale-125 lg:origin-center">
            <LoginForm />
          </div>
        </div>
      </div>
      
      {/* 3. දකුණු පැත්තට තීරු 2ක් දුන්නා (40%) */}
      <div className="relative hidden lg:col-span-2 lg:block">
        <img
          src="/signup.png"
          alt="Image"
          className="absolute inset-0 m-auto h-[80%] w-[80%] mr-45 object-cover mt-20"
        />
      </div>
      
    </div>
  );
}