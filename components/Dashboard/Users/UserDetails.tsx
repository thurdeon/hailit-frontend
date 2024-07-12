'use client'
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { MdArrowBack } from "react-icons/md";
import DashboardCard from "../DashboardCard";
import DashboardUserCard from "./DashboardUserCard";
import { useUserProfile } from "./hooks/useUserProfile";
import UserTripsTable from "./UserTripsTable";
import { UserRole } from "@/lib/store/slice/userSlice";
import { useState } from "react";

import EditUser from "./EditUser";
//UserDetails accepts userRole to show details based on the userRole

export default  function UserDetails () {
const [editUser, setEditUser] = useState<boolean>(false);

const {userTrips, selectedUser, error, deleteError, handleTrackTrip, handleDeselect } = useUserProfile();
  const total_trip_count = userTrips?.total_trip_count
  
  
  const handleEditUser = ()=> {
    setEditUser(()=>!editUser)
  }
  const handleGoBack = ()=> {
    if(editUser) {
      handleEditUser()
    } else {
      handleDeselect();
    }
    
  }

    return (
        <>
        <Button variant={'outline'} onClick={handleGoBack} className="mb-4 w-16"><MdArrowBack /> </Button>
        {
          !editUser &&
          <> 
          
      <main className="md:grid md:grid-cols-8 flex flex-col  gap-2 w-full">
        <div className="w-full col-span-2 flex flex-col gap-2">

          <DashboardUserCard selectedUser={selectedUser} editUser={handleEditUser}/>
              </div>
              

        <div className="w-full col-span-6 space-y-3">
          {
            total_trip_count > 0 && 
          <section className="grid grid-cols-2 grid-rows-2 w-full md:flex   md:flex-row gap-2 items-center md:justify-between">
            <DashboardCard
              number={userTrips?.total_trip_count || 0  }
              title="Orders"
              subTitle="All deliveries made"
            />
            <DashboardCard
              number={userTrips?.delivered_trips || 0}
              title="Delivered"
              subTitle="Successful deliveries"
            />
            <DashboardCard
              number={userTrips?.current_trips || 0}
              title="Current"
              subTitle="Pending deliveries"
            />
            <DashboardCard
              number={userTrips?.cancelled_trips || 0}
              title="Cancelled"
              subTitle="Cancelled trips"
            />
          </section>
          }
          <section className="w-full flex flex-col gap-4"> 
            { total_trip_count > 0  && 

            <h2 className="font-bold text-md">
              {`All ${selectedUser?.first_name} ${selectedUser?.last_name} Trips` 
              }
              
              </h2>
            }

          <Container className="rounded-xl flex justify-center items-center">
            <UserTripsTable />
          </Container>
          </section>
        </div>
      </main>
          </>
        }

        {
          editUser &&
          <EditUser selectedUser= {selectedUser} handleGoBack = {handleGoBack}/>
        }
        </>
    );
}