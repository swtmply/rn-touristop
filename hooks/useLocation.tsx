import React, { useState, createContext, useContext, useCallback } from "react";
import * as Location from "expo-location";

interface ProviderProps {
  children: React.ReactNode;
}

type LocationContextType = {
  location: Location.LocationObject;
  initialLocation: Location.LocationObject;
  updateLocation: (loc: Location.LocationObject) => void;
  refetchLocation: () => void;
  setInitialLocation: (loc: Location.LocationObject) => void;
};

export const LocationContext = createContext<LocationContextType>({
  location: {} as Location.LocationObject,
  initialLocation: {} as Location.LocationObject,
  updateLocation: () => null,
  refetchLocation: () => null,
  setInitialLocation: () => null,
});

export const LocationProvider = (props: ProviderProps) => {
  const [location, setLocation] = useState<Location.LocationObject>(
    {} as Location.LocationObject
  );
  const [initialLocation, setInitialLocationContext] =
    useState<Location.LocationObject>({} as Location.LocationObject);

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

export default () => useContext(LocationContext);
