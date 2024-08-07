"use client";
import { useGetDispatcher } from "@/components/Dispatcher/hooks/useGetDispatcher";
import { MidSkeleton, TopSkeleton } from "@/components/Order/OrderSkeleton";
import OrderSummary from "@/components/Order/OrderSummary";
import OrderUpdates from "@/components/Order/OrderUpdates";
import RecipientSenderCard from "@/components/Order/RecipientSenderCard";
import TrackOrderContainer from "@/components/Order/TrackOrder/TrackOrderContainer";
import Loader from "@/components/Shared/Loader";
import MiddleSectionContainer from "@/components/Shared/MiddleSectionContainer";
import TopSectionContainer from "@/components/Shared/TopSectionContainer";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

import { TripStatus, TripStage } from "../Order/types/Types";
import { redirect } from "next/navigation";
import { useUpdateDispatcherTrip } from "./hooks/useUpdateDispatcherTrip";
import OrderIsDeleted from "../Order/TrackOrder/OrderIsDeletedModal";

export default function DispatcherTripDetail () {
    const {
      handleDispatcherUpdateTrip,
      updateLoading,
      isLoading,
      trip,
      data,
      error,
      tripRequestDate,
      
    } = useUpdateDispatcherTrip();


    
    const tripNotFound = "Trip not found"; //displays if a user has opened a trip and the trip gets deleted. Displays with the trip is deleted modal
    
  const { user_role } = useGetDispatcher();
  if (user_role === "Customer" || !user_role) {
    redirect("/authentication");
  }
  let updateStatus: TripStatus = "Picked Up";
  let updateStage: TripStage = 2;
  
  switch (trip?.trip_status) {
    case "Booked":
      updateStatus = "Picked Up";
      break;
    case "Picked Up":
      updateStatus = "In Transit";
      updateStage = 3;
      break;
    case "In Transit":
      updateStatus = "Delivered";
      updateStage = 4;
      break;
  }
  
  
  if (isLoading) {
      return (
          <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <TopSkeleton />
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          <MidSkeleton />
        </MiddleSectionContainer>
      </main>
    );
  }

  if (data && trip) {
    return (
      <>
      <OrderIsDeleted tripId={trip?.trip_id} />
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-5xl font-bold">#{trip?.trip_id ?? tripNotFound}</span>
          <p className="text-md ">
            <b>Package Type:</b> {trip?.package_type ?? tripNotFound} 
          </p>
          <p className="text-md ">
            <b>Request Date:</b> {tripRequestDate ?? tripNotFound}
          </p>
          <p className="text-md ">
            <b>Trip Medium:</b> {trip?.trip_medium ?? tripNotFound}
          </p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          {!(trip?.trip_status === "Delivered" ||
            trip?.trip_status === "Cancelled") && (
            <TrackOrderContainer headingText="Update Trip">
              <Button
                variant={"outline"}
                onClick={() =>
                  handleDispatcherUpdateTrip({tripId:trip?.trip_id, tripStatus:updateStatus, tripStage: updateStage, dispatcherId: trip?.dispatcher_id})
                  }
                disabled = {updateLoading}
              >
                
                {updateLoading ? <Loader color="text-primary-color"/>  : `Mark as ${updateStatus}`}
              </Button>
            </TrackOrderContainer>
          )}

          <TrackOrderContainer headingText="Trip Status">
            <OrderUpdates />
          </TrackOrderContainer>

          <TrackOrderContainer headingText="Location and Timeline">
            <Container className="w-full flex flex-col gap-2  max-h-80 rounded-xl p-1 ">
              <OrderSummary trip={trip} />
            </Container>
          </TrackOrderContainer>

          {!(trip?.trip_status === "Delivered" ||
            trip?.trip_status === "Cancelled" ) && (
            <>
              {/* SENDER */}
              <TrackOrderContainer headingText="Sender Location">
                <RecipientSenderCard
                  location={trip?.pickup_location ?? tripNotFound}
                  identity="Sender"
                  phoneNumber={trip?.recipient_number ?? tripNotFound}
                />
              </TrackOrderContainer>
              {/* RECIPIENT */}
              <TrackOrderContainer headingText="Recipient Location">
                <RecipientSenderCard
                  location={trip?.drop_off_location ?? tripNotFound}
                  identity="Recipient"
                  phoneNumber={trip?.sender_number ?? tripNotFound}
                />
              </TrackOrderContainer>
            </>
          )}

          <TrackOrderContainer headingText="Cost and Payment">
            <Container className=" w-full h-auto rounded-xl">
              <div className="grid grid-cols-3  p-3 ">
                <span className="text-[13px]">
                  <p className=" font-bold">Amount</p>
                  <p> {trip?.trip_cost ?? tripNotFound} </p>
                </span>
                <span className="text-[13px]">
                  <p className=" font-bold">Status</p>
                  <p> {trip?.payment_status ? "Paid" : "Not Paid"}</p>
                </span>
                <span className="text-[13px]">
                  <p className=" font-bold">Method</p>
                  <p> {trip?.payment_method ?? tripNotFound}</p>
                </span>
              </div>
            </Container>
          </TrackOrderContainer>
        </MiddleSectionContainer>
      </main>
      </>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10 mb-20">
        <TopSectionContainer className="flex flex-col items-start justify-center gap-2 w-full h-80 bg-slate-800  p-4 text-white ">
          <span className="text-4xl font-bold ">No Trip Found</span>
          <p className="text-lg font-bold">Check Trip ID and Retry</p>
        </TopSectionContainer>

        <MiddleSectionContainer className="flex flex-col justify-start items-center space-y-2 p-5">
          <MidSkeleton />
        </MiddleSectionContainer>
      </main>
    );
  }
}
