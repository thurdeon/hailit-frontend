import * as Highcharts from "highcharts";

import { useSetTheme } from "../../Theme/hooks/useSetTheme";
import ChartContainer from "./ChartContainer";
import { useTripMediumData } from "./hooks/useTripMediumData";

export default function TripMediumChart() {
  const { theme, systemTheme } = useSetTheme();

  const { motor, truck, car, tripMonths, totalMonthsData, loading,  } =
    useTripMediumData();

  const mediumOption: Highcharts.Options = {
    chart: {
      backgroundColor: theme === "dark" || (theme === "system" && systemTheme === "dark") ? "#1E1E1E" : "white",
    },
    title: { text: "Trip Medium " },
    xAxis: {
      categories: tripMonths,
      title: { text: "Months" },
    },
    yAxis: { title: { text: "Trip Counts" } },
    series: [
      {
        name: "Truck ",

        type: "line",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (truck && truck[index]) || 0,
          })),
      },
      {
        name: "Motor ",

        type: "line",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (motor && motor[index]) || 0,
          })),
      },
      {
        name: "Car",

        type: "line",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (car && car[index]) || 0,
          })),
      },
      {
        name: "All Trips",

        type: "line",

        data:
          tripMonths &&
          tripMonths.map((month: string, index: number) => ({
            name: month,
            y: (totalMonthsData && totalMonthsData[index]) || 0,
          })),
      },
    ],

    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
          },
          {
            enabled: true,

            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
  };

  return <ChartContainer chartOptions={mediumOption} loading={loading} />;
}
