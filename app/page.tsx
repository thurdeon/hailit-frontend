import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AccountAccess } from "@/components/common/account-access";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <div className="flex flex-col items-center justify-center gap-2" >
        <span className="text-7xl font-bold">Hello!</span>
        <p className="text-3xl">Welcome to HailIt</p>
        <p className="text-center mt-8">
          Request for affordable <br/> but fast deliveries in Accra
        </p>
      </div>
      <div>
        
      </div>
      <div className="mt-16 flex flex-col gap-5">
      <Link href="/order"><Button variant='outline' className="border border-slate-300 h-14 w-60 flex gap-4">  Continue as Guest</Button></Link>
      <Button variant='outline' className="border border-slate-300 h-14 w-60 flex gap-4"> <FcGoogle className="text-2xl"/> Continue with Google</Button>
      

      <AccountAccess/>
      </div>
      </main>
  );
}
