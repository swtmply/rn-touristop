import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  Animated,
} from "react-native";
import MapView from "react-native-maps";
import usePOI, { Site } from "../hooks/usePOI";

export const CARD_WIDTH = Dimensions.get("window").width * 0.8;
export const CARD_WIDTH_INSET = CARD_WIDTH * 0.12 - 10;

type MapOverlayProps = {
  scrollViewRef: React.RefObject<ScrollView>;
  mapRef: React.RefObject<MapView>;
};

export default function MapOverlay({ scrollViewRef, mapRef }: MapOverlayProps) {
  const { sites, pinSite } = usePOI();

  // Animate to region
  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      let regionTimeout;
      if (index >= sites.length) {
        index = sites.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinates } = sites[index];
          pinSite(sites[index]);
          mapRef?.current?.animateToRegion(
            {
              latitude: coordinates?.latitude as number,
              longitude: coordinates?.longitude as number,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            350
          );
        }
      }, 10);
    });
  });

  return (
    <View style={styles.container}>
      <Search />
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.cardsScroll}
        contentInset={{
          top: 0,
          bottom: 0,
          left: CARD_WIDTH_INSET,
          right: CARD_WIDTH_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === "android" ? CARD_WIDTH_INSET : 0,
          alignItems: "center",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: mapAnimation } } }],
          { useNativeDriver: true }
        )}
      >
        {sites.map((site) => (
          <Card key={site.name} site={site} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const Search = () => {
  return <Text style={styles.input}>Mapu Overlayu</Text>;
};

type CardProps = {
  key: React.Attributes["key"];
  site: Site;
};

const Card = ({ site }: CardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={require("../assets/images/sample-image.png")}
      />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {site.name}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "space-between",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 70,
    paddingBottom: 50,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  cardsScroll: {
    maxHeight: 150,
  },
  cardContainer: {
    maxHeight: 120,

    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    width: CARD_WIDTH,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  cardText: {
    marginLeft: 10,
    justifyContent: "flex-end",
    flex: 1,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  cardDescription: {
    color: "#828282",
  },
  cardImage: {
    width: 100,
    height: 100,
  },
});
