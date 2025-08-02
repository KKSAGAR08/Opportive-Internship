import { ArrowLeft, Eye, EyeClosed, EyeOff, GalleryVerticalEnd } from "lucide-react";
import {useAuthStore} from "../../store/userAuthStore"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { useState } from "react";
import toast from "react-hot-toast"
import { Link } from "react-router-dom";

export default function LoginForm({ className, ...props }) {
  const [seePassword,setSeePassword] = useState(false)
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
  });

  const {signUP,isSigningIN} = useAuthStore();

  const Validate = ()=>{
    if(!formData.name.trim()) return toast.error("Please provide the Name")
    if(!formData.email.trim()) return toast.error("Please provide the Email")
    if(!/^\w+@\w+\.\w+$/.test(formData.email)) return toast.error("Please provide the Proper Email address")
    if(!formData.password) return toast.error("Please provide the password")
    if(formData.password.length<6) return toast.error("Password must be 6 characters")
    
    return true
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const success = await Validate()

    if(success===true) signUP(formData)
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="/login"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <MessageOutlinedIcon className="size-10" />
              </div>
              <span className="sr-only">chat online</span>
            </a>
            <h1 className="text-xl font-bold">
              Welcome to Online Chat Application
            </h1>
            <div className="text-center text-sm">
               have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Log-in
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="name"
                required
                value={formData.name}
                onChange={(e)=>setFormData((form)=>({...form,name:e.target.value}))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={(e)=>setFormData((form)=>({...form,email:e.target.value}))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={seePassword?"text":"password"}
                  placeholder="******"
                  required
                  value={formData.password}
                  onChange={(e)=>setFormData((form)=>({...form,password:e.target.value}))}
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-transparent text-black border-none hover:bg-transparent shadow-none cursor-pointer"
                  variant="outline"
                  onClick={()=>setSeePassword(!seePassword)}
                >
                  {
                    seePassword?<EyeOff/>:<Eye/>}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={isSigningIN}>
              {isSigningIN?
              <span>Loading...</span>:<span>Sign UP</span>
}
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
       <Link to='/'>
       <Button variant="outline" className="cursor-pointer">
        <ArrowLeft/>
        <span>Back to Home Page</span>
       </Button>
       </Link>
      </div>
    </div>
  );
}
