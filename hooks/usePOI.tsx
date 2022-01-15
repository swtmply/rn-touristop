import React, { useState, createContext, useContext, useCallback } from "react";
import * as Location from "expo-location";
import convertDMStoDD from "../lib/convertDMStoDD";

interface ProviderProps {
  children: React.ReactNode;
}

type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Site = {
  image: string;
  name: string;
  description: string;
  rating: number;
  coordinates?: Coordinates;
  dmsCoordinates: string;
};

type POIContextType = {
  sites: Site[];
  pinnedSite: Site | null;
  pinSite: (site: Site | null) => void;
  initSites: (spots: Site[]) => void;
  addSite: (site: Site) => void;
};

const POIContext = createContext<POIContextType>({} as POIContextType);

export const POIContextProvider = (props: ProviderProps) => {
  const [sites, setSites] = useState<Site[]>([]);
  const [pinnedSite, setPinnedSite] = useState<Site | null>(null);

  const initSites = useCallback(
    (spots: Site[]) => {
      spots.map((spot: Site) => {
        const { latitude, longitude } = convertDMStoDD(spot.dmsCoordinates);

        // const distance = geolib.getDistance(
        //   {
        //     latitude: location?.coords?.latitude,
        //     longitude: location?.coords?.longitude,
        //   },
        //   { latitude, longitude }
        // );

        // if (distance > 1000) {
        const has = sites.find((s) => s.name !== spot.name);

        if (!has)
          addSite({
            ...spot,
            coordinates: { latitude, longitude },
          });
        // }
      });
    },
    [setSites]
  );

  const addSite = useCallback(
    (site: Site) => {
      setSites((prev) => [...prev, site]);
    },
    [setSites]
  );

  const pinSite = useCallback(
    (site: Site | null) => {
      setPinnedSite(site);
    },
    [setPinnedSite]
  );

  return (
    <POIContext.Provider
      value={{ sites, pinnedSite, initSites, addSite, pinSite }}
    >
      {props.children}
    </POIContext.Provider>
  );
};

export default () => useContext(POIContext);
