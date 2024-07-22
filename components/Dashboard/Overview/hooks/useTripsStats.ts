import { useGetCurrentMonthTripCountsQuery, useGetWeekTripCountQuery } from "@/lib/store/apiSlice/hailitApi";

type Day = "Sunday"|"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
interface WeekStats {
  tripDays: Day[],
  currentWeekTrips: number[]
}

interface CurrentMonthStats {
    total_trips_current_month: number;
    revenue_current_month: number;
    cancelled_current_month: number;
    delivered_current_month: number;
    pending_current_month: number;
    delivered_percentage_difference: number;
    revenue_percentage_difference: number;
    pending_percentage_difference: number;
    total_trips_percentage_difference: number;
    cancelled_percentage_difference:number;
  }
export const useTripsStats = ()=> {
    const {data:monthStats, isLoading, error,} = useGetCurrentMonthTripCountsQuery('', {
      pollingInterval:5000,
      skipPollingIfUnfocused: true
    });
    const {data:weekStats, isLoading:weekLoading, error:weekError,} = useGetWeekTripCountQuery('', {
      pollingInterval:5000,
      skipPollingIfUnfocused: true
    });

    const currentMonthStats:CurrentMonthStats = monthStats;
    
    
    
    const tripDays = weekStats?.currentWeekTrips?.tripDays;
    const tripCounts = weekStats?.currentWeekTrips?.tripCounts;
    
    
    return {currentMonthStats, isLoading, error, tripDays, tripCounts, weekLoading, weekError }
}