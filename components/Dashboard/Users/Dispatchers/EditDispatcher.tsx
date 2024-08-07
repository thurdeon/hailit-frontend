"use client";
import FormField from "@/components/Form/FormField";

import Loader from "@/components/Shared/Loader";
import { Modal } from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormProvider } from "react-hook-form";
import SecondaryModal from "../../../Shared/SecondaryModal";
import AssignVehicle from "./AssignVehicle";
import { useEditDispatcher } from "./hooks/useEditDispatcher";

export default function EditDispatcher( {cancelEdit}: {cancelEdit: ()=>void}) {
  
  

  const {
    formMethods,
    handleSubmit,
    onDispatcherFormSubmit,
    isLoading,
    isSuccess,
    error,
    handleAvailable,
    editDispatcherModalRef,
    available,
    closeDispatcherModal,
    selectedDispatcher, 
  } = useEditDispatcher();
  
  
  const inputAndLabeClass = "w-full max-w-sm items-center";
  const labelClass = "text-sm font-medium mb-1";

  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h2 className="font-bold text-xl">Assigned Vehicle</h2>
        <div className={`${inputAndLabeClass} flex gap-2 items-center mt-3`}>
          
          <div className="flex gap-3 text-sm font-semibold  w-full max-w-sm justify-between border rounded-xl h-14 items-center p-2 border-slate-400 dark:border-opacity-20">
            <span className="flex flex-col">
            <p className="text-[12px]">{selectedDispatcher?.vehicle?.vehicle_name}</p>
            <p className="text-[10px]">{selectedDispatcher?.vehicle?.plate_number}</p>

            </span>
          </div>
          <Modal dialogTriggerElement={
            <p className="text-[12px] h-12 w-32 flex items-center justify-center rounded-xl  bg-primary-color text-white font-normal"> Change Vehicle</p>
          }>
            <AssignVehicle  />
          </Modal>
        </div>
      </div>
      <h2 className="font-bold text-xl mt-6">{selectedDispatcher?.user_role} Details</h2>
    <FormProvider {...formMethods}>
      <form
        className="w-full flex flex-col items-start justify-start gap-3 "
        id="edit user"
        onSubmit={handleSubmit(onDispatcherFormSubmit)}
      >
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>First Name</h3>
          <FormField
            type="text"
            placeholder="First Name"
            className="h-14 "
            name="first_name"
            defaultValue={selectedDispatcher?.first_name || ""}
          />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Last Name</h3>
          <FormField
            type="text"
            placeholder="Last Name"
            className="h-14"
            name="last_name"
            defaultValue={selectedDispatcher?.last_name || ''}
          />
        </div>

        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Email</h3>
          <FormField
            type="email"
            placeholder="email@example.com"
            className="h-14"
            // defaultValue={email}
            name="email"
            defaultValue={selectedDispatcher?.email}
            disabled={selectedDispatcher?.email }
          />
        </div>
        <div className={inputAndLabeClass}>
          <h3 className={labelClass}>Phone Number</h3>
          <FormField
            type="text"
            placeholder="0240 000 000"
            className="h-14"
            name="phone_number"
            defaultValue={selectedDispatcher?.phone_number || ""}
          />
        </div>
        
          <div className="flex gap-3 text-sm font-semibold mt-3 w-full max-w-sm justify-between border rounded-xl h-14 items-center p-2 border-slate-400 dark:border-opacity-20">
            <p>Available</p>
          <Switch checked={available} onCheckedChange={handleAvailable}  />
          </div>
          <div className={inputAndLabeClass}>
            <h3 className={labelClass}>License Number</h3>
            <FormField
              type="text"
              placeholder="License Number"
              className="h-14"
              name="license_number"
              defaultValue={selectedDispatcher?.license_number || ""}
              />
          </div>
        
        {/* If "'data' in error " is not used, there would be a Type Error. Same with use just "error" and not "error as any" */}
              {error && ('data' in error) && (
         <p className="text-red-500">{`${JSON.stringify((error as any).data.error)}`}</p>
      )}

      <Button className="max-w-sm w-full" type="submit" form="edit user" disabled={isLoading}> {isLoading ? <Loader/> : 'Save'} </Button>
      
      </form>
      <Button className="max-w-sm w-full border border-slate-400 dark:bg-secondary-dark dark:border-opacity-30" variant={'empty'} onClick={cancelEdit} disabled={isLoading}  > Cancel </Button>
    </FormProvider>
    <SecondaryModal closeModal={closeDispatcherModal}  isSuccess={isSuccess} error = {error} modalRef={editDispatcherModalRef} info={`${selectedDispatcher?.user_role} ${error ? ' not updated': ' details saved'}`}/>
    </main>
  );
}
