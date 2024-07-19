"use client";
import TrackOrderForm from "@/components/Form/TrackOrderForm";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { useUserTrackOrder } from "./hook/useUserTrackOrder";

export default function TrackOrder() {
  const { handleTrackTrip, inputRef } = useUserTrackOrder();

  return (
    <>
      <TrackOrderForm onClickFunc={handleTrackTrip} inputRef={inputRef} />

      <span className="flex items-start justify-start">
        <h3 className="font-bold  text-lg mt-4 -mb-1">Additional Tracking</h3>
      </span>

      <Container className="flex flex-col items-center justify-center rounded-xl h-auto p-4 gap-3 w-full md:w-[350px]">
        <p className="text-center">
          Could not find package or cannot reach assigned courier?
        </p>
        <Button variant={"outline"} className="w-2/3 ">
          <MdOutlineLocalPhone className="text-lg mr-2" /> Call Management
        </Button>

        <Button className="w-2/3 bg-green-500 text-white">
          <FaWhatsapp className="text-lg mr-2" /> WhatsApp
        </Button>
      </Container>
    </>
  );
}
