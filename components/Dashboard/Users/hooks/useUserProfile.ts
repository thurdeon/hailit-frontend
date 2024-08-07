'use client'
import { PackageType, TripArea, TripMedium, TripStatus } from "@/components/Order/types/Types";
import { useGetUserTripsQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { User } from "./useUsersTable";
import { useGetUser } from "./useGetUser";
import { PaymentMethod } from "@/components/Order/types/Types";


export const useUserProfile = ()=> {
    const [editUser, setEditUser] = useState<boolean>(false);
  
  
    const {selectedUserId} = useAppSelector(state=>state.dashboard);
    const {user} = useGetUser(selectedUserId)
    const [userTrips, setUserTrips] = useState<UserTrips>({
        current_trips: 0,
        customer_trips: [],
        delivered_trips: 0,
        total_trip_count: 0,
        cancelled_trips: 0
    });

    const customerTrips = userTrips?.customer_trips
    

    const {data, isLoading, error } = useGetUserTripsQuery(selectedUserId);
    
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
        } else {

            setUserTrips(trips)
        }
    }, [trips, error])

    const selectedUser:User = user;
    
    const handleEditUser = () => {
        setEditUser(() => !editUser);
      };
    return {userTrips, customerTrips,  error,  selectedUser, isLoading, handleEditUser, editUser }
}

export interface UserTrip {
    trip_id: string;
    dispatcher_id: string;
    trip_medium: TripMedium;
    trip_status: TripStatus
    package_value: string;
    trip_area: TripArea;
    recipient_number: string;
    sender_number: string;
    package_type: PackageType;
    pickup_location: string;
    drop_off_location: string;
    additional_information: string;
    trip_request_date: null | Date | string;
    trip_completion_date: null | Date | string;
    trip_cost: string;
    payment_status: boolean;
    payment_method: PaymentMethod | '';
  }
  
export interface UserTrips {
    customer_trips: UserTrip[],
    total_trip_count: number, 
    delivered_trips: number, 
    current_trips: number, 
    cancelled_trips: number
 
}
