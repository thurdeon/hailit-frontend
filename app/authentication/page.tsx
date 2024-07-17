"use client";
//next, redux, react, and supabase
import { useAppSelector } from "@/lib/store/hooks";
import { supabaseSession } from "@/lib/supabaseAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BigLoader from "@/components/Shared/BigLoader";
//main components
import Authentication from "@/components/Profile/Authentication/Authentication";


export default function Profile() {
  const router = useRouter();
  //getting data from redux store
  const { authenticationState } = useAppSelector((state) => state.auth);
  const { onboard, user_role } = useAppSelector((state) => state.user);
  const [sessionActive, setSessionActive] = useState<boolean>(false);

  useEffect(() => {
    
    const checkSession = async () => {
      const session = await supabaseSession();
    
      if (authenticationState && session) {
        setSessionActive(true)
        if (!onboard) {
          router.push("/onboarding");
        } else if (user_role === "Admin") {
          router.push("/dashboard");
        } else if (user_role === "Driver" || user_role === "Rider") {
          router.push('/dispatcher');
        }
        return (<div className="flex items-center justify-center w-full">
          <BigLoader/>
        </div>)
      }

      
      
    };
    
    checkSession();

  }, [authenticationState, onboard, user_role, router]);


  return (
    <>
      <main className="flex min-h-screen flex-col md:justify-center  items-center gap-10 mb-32">
        {(!authenticationState || !sessionActive) && <Authentication />}
        
      </main>
    </>
  );
}