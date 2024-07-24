"use client";
//next + react + redux

import BigLoader from "@/components/Shared/BigLoader";
import { supabaseSession } from "@/lib/supabaseAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { workPeriod } from "@/lib/utils";
//main components
import { useAppSelector } from "@/lib/store/hooks";
import { usePathname } from "next/navigation";


export function useHome() {
  const homeModalRef = useRef<any>(null);

  const router = useRouter();
  const path = usePathname();
  
  const {user_role, } = useAppSelector(state=>state.user);
  const {authenticated} = useAppSelector(state=>state.auth)

  const closeHomeModal = ()=> {
    homeModalRef?.current.close();
  }

  const openHomeModal = ()=> {
    homeModalRef?.current.showModal();
  }
  
  useEffect(()=>{
    if(!workPeriod()) {
      openHomeModal()
    }
  }, [workPeriod, openHomeModal])
  //redirect without session or user is not customer
  useEffect(() => {
    const checkSession = async () => {
      
      const session = await supabaseSession();
      if (!session || (user_role && user_role !== "Customer") || !authenticated) {
        router.push('/authentication');
      return (<div className="flex items-center justify-center w-full">
        <BigLoader/>
      </div>)
      } 

    };
    
    checkSession();
  }, [router, supabaseSession, authenticated, user_role, ]);
  
  

    
    return {path, closeHomeModal, homeModalRef}
 
  
}
