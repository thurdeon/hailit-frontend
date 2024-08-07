"use client";
import { User, UserSchema } from "@/components/Form/FormTypes";
import { useUpdateDriverMutation, useUpdateRiderMutation, useUpdateUserMutation } from "@/lib/store/apiSlice/hailitApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatcherProfile } from "./useDispatcherProfile";

export const useEditDispatcher = () => {
  const { selectedDispatcher, handleGoBack } = useDispatcherProfile();

  const [available, setAvailable] = useState<boolean>(selectedDispatcher?.available);
  const [vehicleId, setVehicleId] = useState<string>(selectedDispatcher?.vehicle_id);
  
  const userRole = selectedDispatcher?.user_role;
  
  const [updateRider, {isSuccess: riderUpdated, error:riderUpdateError}] = useUpdateRiderMutation();
  const [updateDriver, {isSuccess: driverUpdated, error:driverUpdateError}] = useUpdateDriverMutation();

  const handleAvailable = () => {
    setAvailable(() => !available);
  };

  //SecondaryModal ref
  const editDispatcherModalRef = useRef<any>(null);
  const editDispatcherModal = editDispatcherModalRef.current;

  const openDispatcherModal = useCallback( () => {
    editDispatcherModal?.showModal();
  }, [editDispatcherModal])

  const closeDispatcherModal = () => {
    editDispatcherModal?.close();
  };

  const [updateUser, { isSuccess, isLoading, error }] = useUpdateUserMutation();

  

  //form submission
  const formMethods = useForm<User>({
    resolver: zodResolver(UserSchema),
  });
  const {
    
    handleSubmit,
    
  } = formMethods;

  const onDispatcherFormSubmit: SubmitHandler<User> = async (
    formData
  ) => {
    try {
      const userDetails = { ...formData, userRole };
      
      const {license_number} = formData;
      await updateUser({ userId: selectedDispatcher.user_id, userDetails });

      
      //update driver/rider-specific details
      userRole === "Rider" 
      ? await updateRider({riderId: selectedDispatcher?.rider_id, riderDetails: {available, license_number,}}) 
      : await updateDriver({driverId: selectedDispatcher?.driver_id, driverDetails: {available, license_number,}})
      
      
      
    } catch (err) {
      

      return { error: err };
    }
  };

    useEffect(()=> {

      if(isSuccess || error) {
        //the editDispatcherModal takes the isSuccess or Error as prop and display the appropriate message
        openDispatcherModal();
      }
    }, [isSuccess, error, openDispatcherModal])

  return {
    formMethods,
    handleSubmit,
    onDispatcherFormSubmit,
    isLoading,
    isSuccess,
    error,
    setAvailable,
    available,
    handleAvailable,
    editDispatcherModalRef,
    closeDispatcherModal,
    vehicleId,
    setVehicleId,
    riderUpdated,
    driverUpdated,
    riderUpdateError,
    driverUpdateError,
    selectedDispatcher,
    handleGoBack,
  };
};
