import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { LocationContext } from "../hooks/useLocation";
import { RootTabScreenProps } from "../types";
import * as Location from "expo-location";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { location, initialLocation, refetchLocation, setInitialLocation } =
    useContext(LocationContext);

  useEffect(() => {
    const getPosition = () => {
      refetchLocation();

      if (Object.keys(initialLocation).length === 0)
        setInitialLocation(location as Location.LocationObject);
    };
    getPosition();
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View</Text>
      <Text>{JSON.stringify(initialLocation, null, 2)}</Text>
      <Text>{JSON.stringify(location, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
