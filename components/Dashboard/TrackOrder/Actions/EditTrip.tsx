"use client";
//ui + icons
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaMapMarkerAlt } from "react-icons/fa";

//react hook form
import FormField from "@/components/Form/FormField";
import { FormProvider } from "react-hook-form";

//main components
import PackageTypes from "@/components/Order/NewDelivery/PackageTypes/PackageTypes";
import SecondaryModal from "@/components/Shared/SecondaryModal";
import TripAreaMediumAndType from "./TripAreaMediumAndType";
import { CalendarField } from "@/components/Form/FormField";

//redux + next + react + helper
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { extractDateWithDayFromDate } from "@/lib/utils";
import Link from "next/link";

//custom hook
import { useEditTrip } from "./hooks/useEditTrip";

export default function EditTrip() {
  
  const {
    formMethods,
    trip,
    handleSubmit,
    onDeliveryFormSubmit,
    packageTypeRef,
    package_type,
    isLoading,
    register,
    closeTripModal,
    error,
    editTripModalRef,
    isSuccess
  } = useEditTrip();
  
  const router = useRouter();

  const { dropOffLocationName, pickUpLocationName } = useAppSelector(
    (state) => state.map
  );

  return (
    <>
    <main className=" bg-white dark:bg-secondary-dark p-6 rounded-xl flex flex-col">
      <h1 className="mb-2 text-2xl">
        Editing Trip: <b>{trip?.trip_id}</b>
      </h1>
      <h1 className="text-md mb-5">
        Requested On:
        <b>{extractDateWithDayFromDate(trip?.trip_request_date)}</b>
      </h1>
      <FormProvider {...formMethods}>
        <form
          id="edit order"
          className="flex flex-col md:flex-row  gap-4 w-full"
          onSubmit={handleSubmit(onDeliveryFormSubmit)}
        >
          <div
            className="flex flex-col w-full max-w-sm  gap-1.5 "
            ref={packageTypeRef}
          >
            <TripAreaMediumAndType />
            <span className="text-left">
              <h3 className=" text-[14px] font-bold ">Package Type</h3>
            </span>
            <div className=" flex flex-col gap-[8px] -mb-5 ">
              <div className="flex flex-row flex-wrap gap-2">
                {/* TRIP TYPE */}

                <PackageTypes />
                <h3 className=" text-[14px] font-bold">
                  Additional Information
                </h3>
                <Textarea
                  className="h-32"
                  {...register("additional_information")}
                  defaultValue={trip?.additional_information}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-[14px] font-bold">Pickup Date</h3>

          
                <CalendarField
                  name="pickup_date"
                  datePurpose="pickup"
                  defaultValue={trip?.trip_commencement_date?.toString()}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <h3 className=" text-[14px] font-bold">Delivery Date</h3>

                <CalendarField
                  name="delivery_date"
                  datePurpose="delivery"
                  defaultValue={trip?.trip_completion_date?.toString()}
                />
              </div>
            </div>

            <span className="mt-2 -mb-3">
              {!package_type && (
                <span className="text-red-500 text-[13px] text-left flex items-start justify-start ">
                  <p>Package type not selected</p>
                </span>
              )}
            </span>
          </div>

          <div className="flex flex-col w-full gap-2">
            <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-[14px] font-bold">Pickup Location</h3>
              <div className="w-full grid grid-cols-8 items-start justify-center gap-1">
                <div className="space-y-1 w-full col-span-6 ">
                  <FormField
                    type="text"
                    placeholder="Enter location for pickup"
                    className="h-14"
                    name="pickup_location"
                    defaultValue={
                      pickUpLocationName
                        ? pickUpLocationName
                        : trip?.pickup_location
                    }
                  />
                </div>
                <span className="flex items-center justify-center mt-4 text-center col-span-1 text-[13px]">
                  OR
                </span>
                <Link className="col-span-1" href={"/pickup-map"}>
                  <Button
                    variant={"outline"}
                    className=" h-14 hover:none dark:hover:none"
                  >
                    <FaMapMarkerAlt className="text-lg" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-start gap-1.5">
              <h3 className=" text-[14px] font-bold">Destination / Drop off</h3>
              <div className="w-full grid grid-cols-8 items-start justify-center gap-1">
                <div className=" w-full col-span-6 ">
                  <FormField
                    type="text"
                    placeholder="Enter drop off location"
                    className="h-14"
                    name="drop_off_location"
                    defaultValue={
                      dropOffLocationName
                        ? dropOffLocationName
                        : trip?.drop_off_location
                    }
                  />
                </div>
                <span className="flex items-center justify-center mt-4 text-center col-span-1 text-[13px]">
                  OR
                </span>
                <Link className="col-span-1" href={"/drop-off-map"}>
                  <Button
                    variant={"outline"}
                    className=" h-14 hover:none dark:hover:none"
                  >
                    <FaMapMarkerAlt className="text-lg" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-[14px] font-bold">Sender Number</h3>
              <FormField
                type="text"
                placeholder="Enter number of sender"
                className="h-14"
                name="sender_number"
                defaultValue={trip?.sender_number}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-[14px] font-bold">Recipient Number</h3>
              <FormField
                type="text"
                placeholder="Enter number of recipient"
                className="h-14"
                name="recipient_number"
                defaultValue={trip?.recipient_number}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <h3 className=" text-[14px] font-bold">Package value (GHS)</h3>
              <FormField
                type="text"
                placeholder="Enter package value"
                className="h-14"
                name="package_value"
                valueAsNumber={true}
                defaultValue={trip?.package_value}
              />
            </div>
          </div>
          <div className="w-full">
            
          </div>
        </form>
      </FormProvider>
      <div className="flex flex-col md:flex-row md:gap-4 gap-2 w-full items-center mt-8 ">
        <Button
          type="submit"
          form="edit order"
          className="md:w-[180px] w-full h-14"
          disabled={isLoading}
        >
          {!isLoading ? "Save" : <Loader />}
        </Button>
        <Button
          type="submit"
          variant={"outline"}
          form="edit order"
          className="md:w-[180px] w-full h-14"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </main>
    <SecondaryModal closeModal={closeTripModal}  isSuccess={isSuccess} error = {error} modalRef={editTripModalRef} info={error ? 'Trip not updated': 'Trip details saved'}/>
    </>
  );
}
