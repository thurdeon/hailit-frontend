import { useEffect, useState } from "react";


interface SortDetails {
  sortDirection: "DESC" | "ASC";
  column: string 
}

export type TableTypes = "Trips Table" | "Vehicles Table" | "Riders Table" | "Drivers Table" | "Users Table"

export function useSortTable({table, columns}:{table: TableTypes, columns: unknown}) {

  const getIniticalSortDetails = ()=> {
    const savedSortDetail = localStorage.getItem(table);
    return savedSortDetail ? JSON.parse(savedSortDetail) : {
      column: columns[0],
    sortDirection: "ASC",
    }
  }

  const [sortDetails, setSortDetails] = useState<SortDetails>(getIniticalSortDetails);


  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const handleSort = (selectedColumn: string) => {
    setDataLoading(true)
    setSortDetails((prev) => ({
      column: selectedColumn,
      sortDirection: prev.sortDirection === "ASC" ? "DESC" : "ASC",
    }));
  };


  useEffect(()=> {
    localStorage.setItem(table, JSON.stringify(sortDetails))
  }, [sortDetails])

  

  return {  
    handleSort, 
    sortDetails,
    setDataLoading,
    dataLoading
  };
}

