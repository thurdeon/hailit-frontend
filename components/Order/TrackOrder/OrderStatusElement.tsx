

import { TripStatus } from "../types/Types";
import { GoX } from "react-icons/go";
import { GrFormCheckmark } from "react-icons/gr";
import { useGetUserTrip } from "../hooks/useGetUserTrip";

export default function OrderStatusElement ({orderStatus, orderStage, children}: {orderStatus: TripStatus, orderStage:number,  children?:React.ReactNode}) {
  const { trip } = useGetUserTrip();
  const currentOrderStage = trip?.trip_stage
    return (
      <div className="flex flex-col items-center justify-center w-1/4 gap-4 relative">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentOrderStage < orderStage
              ? "bg-gray-300 dark:bg-[#4e4e4e]"
              : "bg-black dark:bg-slate-50"
          } ${
            orderStage == 0
              ? "bg-red-500 dark:bg-red-500"
              : currentOrderStage == 4 && orderStatus === "Delivered"
              ? "bg-green-500 dark:bg-green-500"
              : ""
          } `}
        >
          {(orderStatus === "Booked" ||
            orderStatus === "In Transit" ||
            orderStatus === "Picked Up") && (
            <div>
              <div
                className={`absolute w-full h-1 ${
                  currentOrderStage < orderStage
                    ? "bg-gray-300 dark:bg-[#4e4e4e]"
                    : "bg-black dark:bg-slate-50"
                }`}
              >
                <p></p>
              </div>
            </div>
          )}
          {currentOrderStage < orderStage || orderStage === 0 ? (
            <GoX className="text-white dark:text-secondary-dark text-lg z-10" />
          ) : (
            <GrFormCheckmark className="text-white text-lg z-10 dark:text-secondary-dark" />
          )}
        </div>

        <div
          className={`flex flex-col items-center justify-center ${
            currentOrderStage < orderStage
              ? "text-gray-300 dark:text-[#4e4e4e]"
              : "text-black dark:text-slate-50"
          }`}
        >
          {children}
          <div className="flex flex-col items-center justify-center w-full gap-1">
            <p
              className={`text-sm   line-clamp-1  ${
                orderStage == 0
                  ? "text-red-500 dark:text-red-500"
                  : currentOrderStage == 4 && orderStatus === "Delivered"
                  ? "text-green-500 dark:text-green-500"
                  : ""
              }`}
            >
              {orderStatus}
            </p>
          </div>
        </div>
      </div>
    );
}