import React, { useState, createContext, useContext, useCallback } from "react";
import * as Location from "expo-location";

interface ProviderProps {
  children: React.ReactNode;
}

type LocationContextType = {
  location: Object;
  initialLocation: Object;
  updateLocation: (loc: Location.LocationObject) => void;
  refetchLocation: () => void;
  setInitialLocation: (loc: Location.LocationObject) => void;
};

export const LocationContext = createContext<LocationContextType>({
  location: {},
  initialLocation: {},
  updateLocation: () => null,
  refetchLocation: () => null,
  setInitialLocation: () => null,
});

export const LocationProvider = (props: ProviderProps) => {
  const [location, setLocation] = useState<Object>({});
  const [initialLocation, setInitialLocationContext] = useState<Object>({});

  const updateLocation = useCallback(
    (loc: Location.LocationObject) => {
      setLocation(loc);
    },
    [setLocation]
  );

  const setInitialLocation = useCallback(
    (loc: Location.LocationObject) => {
      setInitialLocationContext(loc);
    },
    [setLocation]
  );

  const refetchLocation = useCallback(async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }, [setLocation]);

  return (
    <LocationContext.Provider
      value={{
        location,
        initialLocation,
        updateLocation,
        refetchLocation,
        setInitialLocation,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
