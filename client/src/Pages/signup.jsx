import { SignupForm } from "@/components/signup/signup-form"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-5">
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
          <div className="w-full max-w-sm lg:scale-110 md:scale-125 lg:origin-center">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block lg:col-span-2">
        <img
          src="/signin.png"
          alt="Image"
          className="absolute inset-0 m-auto h-[80%] w-[80%] mr-50 object-cover mt-20"
        />
      </div>
    </div>
  )
}
