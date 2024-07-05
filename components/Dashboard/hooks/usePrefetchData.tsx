import { useCallback, useEffect } from "react";
import { usePrefetch } from "@/lib/store/apiSlice/hailitApi";


export const usePrefetchData = ({page, prefetchOption, total_number_of_pages, endpoint}:{page:number, prefetchOption:any, total_number_of_pages:number, endpoint:string}  ) => {
  //prefetching first five and last pages as well as previous and next pages
const prefetchTrips = usePrefetch(prefetchOption);
  
const handlePrefetchData = useCallback(() => {
  const offsets = page === 1 ? [1, 2, 3, 4, 5] : page === total_number_of_pages ? [-1, -2, -3, -4, -5] : [-1, 1];
  offsets.forEach(offset => prefetchTrips(`${endpoint}?page=${page + offset}`));
}, [prefetchTrips, page]);

//prefetch useEffect

useEffect(()=> {
    handlePrefetchData()
}, [handlePrefetchData])
    

return {handlePrefetchData}
    
}
