"use client";

import { AiFillCar } from "react-icons/ai";
import { FaMotorcycle } from "react-icons/fa";
import { RiCaravanFill } from "react-icons/ri";
import { DeliveryChoices } from "./DeliveryChoice";

import { useDeliveryChoice } from "../../hooks/useDeliveryChoice";

export default function DeliveryMediumChoice() {
  const { trip_medium, trip_area, trip_type, handleDeliveryChoice } = useDeliveryChoice();

  return (
    <>
      <DeliveryChoices
        handleDeliveryOption={handleDeliveryChoice}
        deliveryOption={trip_medium}
        MainIcon={RiCaravanFill}
        choiceType={{
          choice: "Truck",
          choiceCategory: "trip_medium",
        }}
        disabled = {trip_type === "Same Day"}
      >
        <p className="text-[12px] md:text-md text-center">Large package</p>
      </DeliveryChoices>

      <DeliveryChoices
        handleDeliveryOption={handleDeliveryChoice}
        deliveryOption={trip_medium}
        MainIcon={FaMotorcycle}
        choiceType={{
          choice: "Motor",
          choiceCategory: "trip_medium",
        }}
        disabled={trip_area === "Inter City"}
        recommended= {trip_type === "Same Day"}
      >
        <p className="text-[12px] md:text-md text-center p-1">Medium package</p>
      </DeliveryChoices>
      <DeliveryChoices
        handleDeliveryOption={handleDeliveryChoice}
        deliveryOption={trip_medium}
        MainIcon={AiFillCar}
        choiceType={{
          choice: "Car",
          choiceCategory: "trip_medium",
        }}
        recommended= {trip_area === "Inter City"}
      >
        <p className="text-[12px] md:text-md text-center">Big package</p>
      </DeliveryChoices>
    </>
  );
}
