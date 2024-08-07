"use client";

//icons + ui
import toast from "react-hot-toast";
//main components
import { resetDeliveryChoices } from "@/lib/store/slice/deliveryChoicesSlice";

//next+redux+helper function +react
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { copyToClipBoard } from "@/lib/utils";

import { setNewOrder } from "@/lib/store/slice/newOrderSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAddOrderOutcome() {
  const [loading, setLoading] = useState<boolean>(false);
  const { trip_id, order_success } = useAppSelector((state) => state.newOrder);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCopyTripId = (tripId: string) => {
    copyToClipBoard(tripId);
    toast.success(
      <p className=" text-[13px]">
        Trip ID: <b> {tripId} </b> copied
      </p>
    );
  };

  const handleBack = () => {
    dispatch(
      setNewOrder({
        order_success: false,
        trip_id: "",
        order_submitted: false,
        scheduled: false,
      })
    );

    dispatch(resetDeliveryChoices());
  };

  const trackTrip = () => {
    
    
    router.push(`/dashboard/track-order/${trip_id}`)

    setLoading(true);

    dispatch(
      setNewOrder({
        order_success: false,
        order_submitted: false,
        trip_id,
        scheduled: false,
      })
    );

    dispatch(resetDeliveryChoices());
  };
  return {
    loading,
    trackTrip,
    handleBack,
    handleCopyTripId,
    order_success,
    trip_id,
  };
}
