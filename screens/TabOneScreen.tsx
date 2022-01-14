import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { Text, UserMarker, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import MapView from "react-native-maps";
import useLocation from "../hooks/useLocation";
import MapOverlay from "../components/MapOverlay";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { location, initialLocation, refetchLocation, setInitialLocation } =
    useLocation();

  useEffect(() => {
    const getPosition = () => {
      refetchLocation();

      if (Object.keys(initialLocation).length === 0)
        setInitialLocation(location);
    };
    getPosition();
  }, [location]);

  if (Object.keys(initialLocation).length === 0) return <></>;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsCompass={false}
        loadingEnabled={true}
      >
        <UserMarker
          coordinate={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
          }}
          pinned={false}
        />
      </MapView>
      <MapOverlay />
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
