"use client";
import { fetchMapLocationName } from "@/lib/store/actions";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setDropOffLocation,
  setDropOffLocationName,
  setMapLocationName,
  setPickUpLocation,
  setPickUpLocationName,
  setUserLocation
} from "@/lib/store/slice/mapSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGetLocationName } from "./useGetLocationName";
import { useMapProvider } from "./useMapProvider";

type MapBoundaryChange = boolean;
export type LocationType = "pickup" | "drop off";

export const useMap = (locationType: LocationType) => {
  //states
  const [zoom, setZoom] = useState(18);
  const [mapLoading, setMapLoading] = useState(true);
  

  const [mapBoundaryChanged, setMapBoundaryChanged] =
    useState<MapBoundaryChange>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  // next/redux hooks/state
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    dropOffLocation,
    dropOffLocationName,
    pickUpLocation,
    pickUpLocationName,
    mapLocationName,
    userLocation
  } = useAppSelector((state) => state.map);

  //custom hooks
  const { locationNameData } = useGetLocationName();
  const { mapTilerProvider } = useMapProvider();


  
  //map mapModal for location selection confirmation
  const mapModalRef = useRef<HTMLDialogElement | null>(null);
  const mapModal = mapModalRef.current;
  
  const openMapModal = () => {
    mapModal?.showModal();
  };
  const closeMapModal = () => {
    mapModal?.close();
  };

  
  //get the current location point of the user and determine the name of the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        dispatch(setUserLocation([latitude, longitude]));
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );

    if (locationType === "drop off" && dropOffLocation && dropOffLocationName ) {
      
      dispatch(setUserLocation(dropOffLocation))
      dispatch(setMapLocationName(dropOffLocationName))
    }

    if (locationType === "pickup" && pickUpLocation && pickUpLocationName) {
      
      dispatch(setUserLocation(pickUpLocation))
      dispatch(setMapLocationName(pickUpLocationName))
    }
  }, [
    locationType,
    setMapLocationName,
    setUserLocation,
    pickUpLocation,
    pickUpLocationName,
    dropOffLocation,
    dropOffLocationName,
  ]);

  //fetch location name
  useEffect(() => {
    if (userLocation) {
      const fetchedLocationName = async (): Promise<string> => {
        const locationName = locationNameData({
          latitude: userLocation[0],
          longitude: userLocation[1],
        });

        return locationName;
      };

      dispatch(fetchMapLocationName(fetchedLocationName));
    }
  }, [dispatch, userLocation, fetchMapLocationName, locationNameData]);

  //set chosen location name and goback to the previous page
  const handleSelectedLocation = () => {
    setLoading(true);
    if (locationType === "drop off") {
      dispatch(setDropOffLocation(userLocation));
      dispatch(setDropOffLocationName(mapLocationName));
    }

    if (locationType === "pickup") {
      dispatch(setPickUpLocation(userLocation));
      dispatch(setPickUpLocationName(mapLocationName));
    }

    router.back();
  };

  //set map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return {
    handleSelectedLocation,
    locationNameData,
    zoom,
    setZoom,
    dropOffLocation,
    setPickUpLocation,
    setMapBoundaryChanged,
    dropOffLocationName,
    pickUpLocation,
    pickUpLocationName,
    userLocation,
    setDropOffLocation,
    dispatch,
    mapBoundaryChanged,
    loading,
    openMapModal,
    closeMapModal,
    mapModalRef,
    mapTilerProvider,
    mapLoading,
    mapLocationName,
    setUserLocation,
  };
};


