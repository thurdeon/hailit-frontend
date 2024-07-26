'use client'
import { useRef, useState } from "react";
import { useSortTable } from "./useSortTables";
import { TableTypes } from "./useSortTables";

 type EndPoint = "vehicles?" | "users?" | "riders?" | "drivers?" | "trips?";

export function useSearchAndSort({endPoint, columns, table}:{table:TableTypes,  endPoint:EndPoint, columns: any}) {

  const searchRef = useRef<any>(null);
   const [searchQuery, setSearchQuery] = useState<string>('');
  const { handleSort, sortDetails, setDataLoading, dataLoading, } = useSortTable({table: table, columns: columns});
  
  if (sortDetails.column && sortDetails.sortDirection) {
    endPoint+= `&sortColumn=${sortDetails.column}&sortDirection=${sortDetails.sortDirection}`
  }
  if(searchQuery) {
    endPoint+=`&search=${searchQuery}`
  }

  const handleSearch = ({reset}:{reset?:boolean})=> {
    if(reset) {
      searchRef.current.value = ''
    }
    setSearchQuery(searchRef?.current?.value)
  }

  return {
    handleSort, 
    sortDetails,
    dataLoading,
    handleSearch,
    searchRef,
    endPoint,
    setDataLoading
  };
}

