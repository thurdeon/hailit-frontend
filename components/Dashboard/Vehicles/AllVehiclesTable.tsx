'use client'
import ItemsCount from "@/components/Shared/Pagination/ItemsCount";
import Pagination from "@/components/Shared/Pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useState } from "react";
import { LuCheckCircle2, LuXCircle } from "react-icons/lu";
import { TableType, useGetTableData } from "../hooks/useGetTableData";
import SkeletonTable from "../SkeletonTable";
import SearchTable from "../TableComponents/SearchTable";
import TablesHeadings from "../TableComponents/TablesHeadings";
import { useGetVehicle } from "./hooks/useGetVehicle";
import DashboardTableItemLoader from "../DashboardTableItemLoader";


export default function AllVehiclesTable() {
    const {handleSelectVehicle, selectedVehicleId, vehicleLoading} = useGetVehicle()
  const [page, setPage] = useState<number> (1);
 
  const {
    dataLoading: vehiclesLoading,
    total_number_of_pages,
    data,
    error,
    total_items,
    searchRef: vehicleSearchRef,
    sortDetails,
    handleSort,
    isSearch,
    handleSearch: handleVehicleSearch,
    status
  } = useGetTableData( {page, table:TableType.VehiclesTable, initialColumn: "Name"})
  
  
  const vehicles = data?.vehicles;

  if (error) {
    return (
      <div>
        <p className="text-3xl font-bold flex flex-col items-center justify-center">
  
          Error occurred!
        </p>
      </div>
    );
  }
  
  
  return (
    <>
    <div className="w-full flex items-end justify-end">

    <SearchTable ref={vehicleSearchRef} handleSearch={handleVehicleSearch} status={status}/>
    </div>
    <div className="flex flex-col w-full   gap-2 p-4 rounded-xl border border-slate-300 bg-white  dark:border-slate-100 dark:border-opacity-20 dark:bg-secondary-dark  dark:text-slate-100  cursor-pointer">
      <Table>
        <TableHeader>
          <TablesHeadings handleSort={handleSort} sortDetails={sortDetails} tableHeadings={tableHeadings} />
        </TableHeader>
        <TableBody>
          {vehiclesLoading && <SkeletonTable rows={5} cells={5} />}
          {/* vehicles of length 0 is only possible when searching  */}
          {vehicles && vehicles.length === 0 &&
          <div className="text-3xl font-bold flex flex-col items-center justify-center h-44">
          <p >
    
            No vehicle matched your search
          </p>
        </div>
          }
          {!vehiclesLoading && !error &&
            vehicles?.map((vehicle: Vehicle) => (
              <>
              {vehicleLoading && selectedVehicleId === vehicle.vehicle_id && (
                    <DashboardTableItemLoader />
                  )}
              <TableRow key={vehicle?.vehicle_id} onClick={()=>handleSelectVehicle(vehicle?.vehicle_id)} className={`${vehicleLoading ? 'opacity-30': ''}`}>
                <TableCell>{vehicle?.vehicle_name}</TableCell>
                <TableCell>{vehicle?.vehicle_type}</TableCell>
                <TableCell>{vehicle?.vehicle_model}</TableCell>
                <TableCell>{vehicle?.plate_number}</TableCell>                
                <TableCell> {vehicle?.available ? (
                    <LuCheckCircle2 className="text-green-500 text-2xl" />
                    ) : (
                        <LuXCircle className="text-red-500 text-2xl" />
                        )}</TableCell>
                
              </TableRow>
              </>
            ))}
        </TableBody>
      </Table>
    </div>
    <div className="flex md:flex-row flex-col">{
      total_number_of_pages && 
      <ItemsCount currentItemsCount={vehicles.length} item="Trips" page={page} total_items={total_items} total_number_of_pages={total_number_of_pages} />
      }
      <div>
          <Pagination storageKey="Vehicles"  setPage={setPage} totalPages={total_number_of_pages} isSearch={isSearch} />
      </div>
    </div>
    </>
  );
}

const tableHeadings = [
  "Name",
  "Type",
  "Model",
  "Number Plate",
  "Available",
  
] 



export type VehicleType = "car" | "truck" | "motor"
export interface Vehicle {
    vehicle_id: string,
    vehicle_name: string, 
    vehicle_model: string, 
    plate_number: string,
    vehicle_type: VehicleType,
    insurance_details: string,
    road_worthy: string,
    available: boolean
}
