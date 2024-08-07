import OrderSummary from "@/components/Order/OrderSummary";
import Loader from "@/components/Shared/Loader";
import { useGetTrip } from "./StatusSection/hooks/useGetTrip";

export default function PackageSection () {
    const {trip, isLoading} = useGetTrip();
    return (
      <div className="flex flex-col  w-full  rounded-lg  ">
        <h3 className="font-bold">PACKAGE</h3>
        <h3 className="text-[12px] text-slate-400 ">Details</h3>
        {isLoading &&
          <div className=" w-full  items-center gap-1.5">
          <Loader color="text-primary-color"/>
          </div>  
        }
        <div className=" w-full items-center gap-1.5  ">
          <OrderSummary trip={trip} />
        </div>
      </div>
    );
}