"use client";
import { useGetTripQuery, useUpdateTripMutation } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setActiveSection,
  setAssignedDispatcher,
  setSelectedTripId,
  setTrackingOrder,
  setTripStatus,
} from "@/lib/store/slice/dashboardSlice";
import { setTrip } from "@/lib/store/slice/tripSlice";

import { useRef, useCallback, useEffect } from "react";

export type OrderStatus =
  | "Booked"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

import { Vehicle } from "@/components/Dashboard/Vehicles/hook/useGetVehicles";

export const useGetTrip = () => {
  const inputRef = useRef<any>(null);

  const {
    previousSelectedTripId,
    selectedTripId,
    trackingOrder,
    editingOrder,
    
    tripStage,
    tripStatus,
  } = useAppSelector((state) => state.dashboard);
  const trip = useAppSelector((state)=>state.trip)
  const { data, isLoading, error } = useGetTripQuery(`${selectedTripId}`);
  const fetchedTrip = data?.trip
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedTripId && fetchedTrip) {
      dispatch(setTrip(fetchedTrip));
    }
  }, [selectedTripId, fetchedTrip, dispatch]);
  

  
  const dispatcher = trip?.dispatcher;

  const [updateTrip] = useUpdateTripMutation();

  //move this to useUpdateTrip
  const handleTripUpdate = useCallback(async (key: string, tripDetails: any) => {
    try {
      dispatch(setTrip({ ...trip, ...tripDetails }));
      await updateTrip({ trip_id: selectedTripId, tripDetails });
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  }, [trip, selectedTripId, updateTrip, dispatch]);
  


  const handleTrackTrip = () => {
    const tripId = inputRef.current?.value;
    dispatch(setTrackingOrder(true));
    dispatch(setSelectedTripId(tripId));
  };

  const handleUsersOrTripsNav = (section: string) => {
    dispatch(setActiveSection(section));
  };

  return {
    tripStage,
    tripStatus,
    trip,
    trackingOrder,
    dispatcher,
    inputRef,
    error,
    isLoading,
    handleTripUpdate,
    handleTrackTrip,
    handleUsersOrTripsNav,
    editingOrder,
  };
};
