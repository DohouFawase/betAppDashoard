import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { AiOutlineX } from "react-icons/ai";
export default function LoginCompo() {
  return (
    <>
      <div className="px-24">
        <div className="text-center space-y-3.5">
          <h1 className="text-2xl  font-bold  uppercase">App Bet</h1>
          <p className="text-sm font-medium text-gray-500">Welcome Back this space is receve for only Admin</p>
        </div>

        <div className="space-y-4 ">
          <div className="flex flex-col space-y-3.5">
            <div className="space-y-3.5">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                type="email"
                className="py-5.5 px-2 outline-none focus:none border  rounded-sm"
              />
            </div>
            <div className="space-y-3.5">
              <label htmlFor="pasword" className="text-sm font-medium">Password</label>
              <Input
                type="password"
                className="py-5.5 px-2 outline-none focus:none border  rounded-sm"
              />
            </div>
<Button variant="outline" className="py-5.5 bg-black text-white ">Se connecter</Button>



          </div>

          <div className="flex flex-col space-y-3.5">
<Button variant="outline" className="py-5.5 "><FcGoogle /> Login with your Google Acount</Button>
<Button variant="outline" className="py-5.5 "><DiApple />  Login with your Apple Acount</Button>
<Button variant="outline" className="py-5.5 "> <AiOutlineX /> Login with your X Account </Button>
          </div>
        </div>
      </div>
    </>
  );
}
