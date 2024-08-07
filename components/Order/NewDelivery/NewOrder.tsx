"use client";
//ui + icons

//main components
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";

import NewOrderForm from "@/components/Form/NewOrderForm";
//redux + next
import { useAppSelector } from "@/lib/store/hooks";
import { redirect } from "next/navigation";

export default function NewOrder() {
  //redirect users who are not customers
  const { user_role } = useAppSelector((state) => state.user);
  user_role && user_role !== "Customer" ? redirect("/authentication") : "";

  const { trip_medium, trip_area, trip_type } = useAppSelector(
    (state) => state.deliveryChoices
  );

  if (!trip_medium || !trip_area || !trip_type) {
    return redirect("/order");
  }

  return (
      <main className="flex min-h-screen flex-col items-center gap-10 md:justify-center md:items-center">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold ">Package details</span>
          <p className="text-lg">Enter details of your package</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center p-10 mb-20 md:justify-center">
          <div className="w-full space-y-6">
            <NewOrderForm />
          </div>
        </MiddleSectionContainer>
      </main>
    
  );
}
