import { View, StyleSheet, TouchableOpacity, Text, Button, FlatList } from "react-native";
import { Image, type ImageSource } from 'expo-image'
import { Directions } from "react-native-gesture-handler";
import CustomButton from "../ui/CustomButton";
import { useState } from "react";


type RestaurantBarcodeProps = {
  barcodes: BarcodeData[];
  funcPress: (arg0: BarcodeData[]) => void
};

const restaurantImages: { [key: string]: any } = {
  "Goldis": require('@/assets/images/Goldis.jpg'),
  "Humus": require('@/assets/images/Humus.jpg'),
};


export default function RestaurantBarcode({ barcodes, funcPress }: RestaurantBarcodeProps) {
  const [showList,setShowList] = useState<boolean>(false)
  const restaurantName = barcodes[0]?.restaurant || "Unknown Restaurant";
  const sumAmount = barcodes.reduce((sum, item) => sum += item.amount, 0)
  const showListBarcodes = (barcodes:BarcodeData[]) => {
    !showList?  setShowList(true) : setShowList(false)
  }

  const imageSource = restaurantImages[restaurantName] || require('@/assets/images/default.jpg');

  return (
    <View style={styles.restaurantContainer}>
      <Image
        source={imageSource}
        style={styles.backgroundImage}
      />
      <TouchableOpacity
        onPress={() => { funcPress(barcodes) }}
        style={styles.restaurantHeader}
      >
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Text style={styles.restaurantName}>{`סה"כ ${sumAmount} ש"ח `}</Text>
          <TouchableOpacity
            onPress={() => { showListBarcodes(barcodes) }}
            style={styles.showList}
          >
        <Text style={styles.itemCount}>
            {`${barcodes.length} זיכויים`}
        </Text>
          </TouchableOpacity>

      </TouchableOpacity>
      {showList && (
        <FlatList
          data={barcodes}
          keyExtractor={(item) => item.value}
          renderItem={({ item}:{item:BarcodeData}) => (
            <View style={styles.item}>
              <Text style={styles.text}>ברקוד: {item.value}</Text>
              <Text style={styles.text}>סכום: {item.amount}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  restaurantContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1, // Adjust the image opacity as needed
  },
  restaurantHeader: {
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemCount: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    backgroundColor:"#999",
  },
  showList:{
    backgroundColor:"lightBlue"
  },
  item: {
    backgroundColor:"white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
});
