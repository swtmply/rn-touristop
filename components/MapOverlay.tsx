import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";

const CARD_WIDTH = Dimensions.get("window").width * 0.8;
const CARD_WIDTH_INSET = CARD_WIDTH * 0.12 - 10;

export default function MapOverlay() {
  return (
    <View style={styles.container}>
      <Search />
      <ScrollView
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
        }}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ScrollView>
    </View>
  );
}

const Search = () => {
  return <Text style={styles.input}>Mapu Overlayu</Text>;
};

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        source={require("../assets/images/sample-image.png")}
      />
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>Rizal Monument</Text>
        <Text style={styles.cardDescription}>
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
    paddingVertical: 70,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  cardsScroll: {
    maxHeight: 120,
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    width: CARD_WIDTH,
    marginHorizontal: 10,
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
