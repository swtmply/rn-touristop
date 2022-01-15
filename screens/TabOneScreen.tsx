import { useEffect, useRef } from "react";
import { Dimensions, Platform, ScrollView, StyleSheet } from "react-native";

import { Marker, Text, UserMarker, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import useLocation from "../hooks/useLocation";
import MapOverlay, {
  CARD_WIDTH,
  CARD_WIDTH_INSET,
} from "../components/MapOverlay";
import spots from "../spots";
import usePOI, { Site } from "../hooks/usePOI";
import MapViewDirections, {
  MapViewDirectionsPrecision,
} from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = "AIzaSyDQoJblDf515kpbohsTcR52r8hrkIr1n44";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { location, initialLocation, refetchLocation, setInitialLocation } =
    useLocation();
  const { sites, pinnedSite, initSites, pinSite } = usePOI();
  const scrollViewRef = useRef<ScrollView>(null);
  const mapRef = useRef<MapView>(null);

  // Initialize Markers and Sites
  useEffect(() => {
    const getPosition = () => {
      refetchLocation();

      if (Object.keys(initialLocation).length === 0) {
        setInitialLocation(location);
        if (sites.length === 0) initSites(spots);
      }
    };
    getPosition();
  }, [location]);

  // Add events on markers
  const onMarkerPress = (site: Site, index: number) => {
    let x = index * CARD_WIDTH + index * 20;
    if (Platform.OS === "ios") {
      x = x - CARD_WIDTH_INSET;
    }

    pinSite(site);

    scrollViewRef!.current!.scrollTo({
      x,
      y: 0,
      animated: true,
    });
  };

  // Loading State
  if (Object.keys(initialLocation).length === 0) return <></>;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsPointsOfInterest={false}
        showsCompass={false}
        loadingEnabled={true}
      >
        <UserMarker
          coordinate={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
          }}
          pinned={pinnedSite !== null}
        />
        {sites &&
          sites.map((site, idx) => (
            <Marker
              key={site.name}
              coordinate={{
                latitude: site.coordinates?.latitude!,
                longitude: site.coordinates?.longitude!,
              }}
              pinned={pinnedSite?.name === site.name}
              onPress={() => onMarkerPress(site, idx)}
            />
          ))}
        {pinnedSite && (
          <MapViewDirections
            apikey={GOOGLE_MAPS_APIKEY}
            origin={{
              latitude: initialLocation?.coords?.latitude as number,
              longitude: initialLocation?.coords?.longitude as number,
            }}
            destination={{
              latitude: pinnedSite?.coordinates?.latitude as number,
              longitude: pinnedSite?.coordinates?.longitude as number,
            }}
            strokeWidth={5}
            strokeColor="#5D6BE6"
            timePrecision={"now" as MapViewDirectionsPrecision}
          />
        )}
      </MapView>
      <MapOverlay scrollViewRef={scrollViewRef} mapRef={mapRef} />
      {/* <ScrollView>
        <Text>{JSON.stringify(sites, null, 2)}</Text>
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
