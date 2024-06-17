'use client'
import { useEffect, useState } from "react";
import { useGetUserTrips } from "../../hooks/useGetUserTrips";
import {  useGetUserTripsQuery, useLazyDeleteTripQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { User } from "./useGetAllUsers";
interface UserTrip {
    trip_id: string;
    dispatcher_id: string;
    trip_medium: "Motor" | "Car" | "Bicycle" | string;
    trip_status: "Requested" | "Pending" | "In Progress" | "Delivered" | "Cancelled";
    package_value: string;
    trip_area: string;
    recipient_number: string;
    sender_number: string;
    package_type: string;
    pickup_location: string;
    drop_off_location: string;
    additional_information: string;
    trip_request_date: string;
    trip_cost: string;
    payment_status: boolean;
    payment_method: "Cash on Delivery" | "Mobile Money" | "Card" | string;
  }
  
interface UserTrips {
    customer_trips: UserTrip[],
    total_trip_count: number, 
    delivered_trips: number, 
    current_trips: number, 
    cancelled_trips: number
 
}
export const useUserProfile = ()=> {
    const {selectedUserId} = useAppSelector(state=>state.dashboard);
    const {usersData} = useAppSelector(state=>state.dashboardTables);
    const [userTrips, setUserTrips] = useState<UserTrips>({
        current_trips: 0,
        customer_trips: [],
        delivered_trips: 0,
        total_trip_count: 0,
        cancelled_trips: 0
    });


    const {data, isLoading, error } = useGetUserTripsQuery(selectedUserId);
    const { handleTrackTrip} = useGetUserTrips(selectedUserId);
    const trips = data?.trips
    
    useEffect(()=>{
        if(error) {
            setUserTrips({
                current_trips: 0,
                customer_trips: [],
                delivered_trips: 0,
                total_trip_count: 0,
                cancelled_trips:0
            })
        }else {

            setUserTrips(trips)
        }
    }, [trips, error])

    const [deleteTrip, {data:deleteData, error:deleteError, isLoading:deleteLoading}] = useLazyDeleteTripQuery();
    
    
    const handleDeleteTrip = (tripId:string)=> {
        deleteTrip(tripId)
        const customerTrips = userTrips.customer_trips.filter(trip=>trip.trip_id !==tripId)
        deleteData ? setUserTrips((prevTrips=>({...prevTrips, customer_trips: customerTrips}))) : deleteError
    }

    const selectedUser:User = usersData?.filter((user:User)=>user.user_id === selectedUserId)[0];
    return {userTrips, handleDeleteTrip, error, deleteError, handleTrackTrip, selectedUser, isLoading }
}