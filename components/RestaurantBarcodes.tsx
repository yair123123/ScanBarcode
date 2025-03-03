import { View, StyleSheet, TouchableOpacity, Text, FlatList, Modal, Button } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { getImageForRestaurant, parseRestaurantToHebrow } from "../utils/images";
import { ListBarcodes } from "./ListBarcodes";
import { findBarcodeLowestIndex, sortByAmount } from "@/utils/showBarcode";



type RestaurantBarcodeProps = {
  restaurant: string;
  barcodes: { [key: string]: BarcodeData[] };
  funcPress: (barcodes: BarcodeData[]) => void;
  deleteBarcode: (value: string, restaurant: string) => void;
  markBarcodeAsUsed: (barcodeData: BarcodeData, value: string, restaurant: string) => void;
};

export default function RestaurantBarcode({ barcodes, funcPress, restaurant, deleteBarcode, markBarcodeAsUsed }: RestaurantBarcodeProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [barcodesToShow, setBarcodesToShow] = useState<BarcodeData[]>(barcodes[restaurant]);
  useEffect(() => { setBarcodesToShow(barcodes[restaurant].filter((item) => item.is_active)) }, [barcodes]);
  const sumAmount = barcodesToShow.reduce((sum, item) => sum + item.amount, 0);
  const sumAround = Math.round(sumAmount * 100) / 100

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <View style={styles.restaurantContainer}>

      <Image
        source={getImageForRestaurant(restaurant)}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />

      <TouchableOpacity onPress={() => funcPress(sortByAmount(barcodesToShow))} style={styles.restaurantHeader}>
        <View style={styles.restaurantHeader}>

          <Text style={styles.restaurantName}>{parseRestaurantToHebrow(restaurant)}</Text>

          <View style={styles.detailsRow}>

            <Text style={styles.totalAmount}>{`${sumAround} ש"ח`}</Text>

            <TouchableOpacity onPress={toggleModal} style={styles.showModalButton}>
              <Text style={styles.itemCount}>{`${barcodesToShow.length} זיכויים`}</Text>
              <Text style={styles.modalButtonText}>הצג</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <ListBarcodes
          barcodes={barcodes}
          deleteBarcode={deleteBarcode}
          markBarcodeAsUsed={markBarcodeAsUsed}
          barcodesToShow={barcodesToShow}
          restaurantName={restaurant}
          toggleModal={toggleModal}
        />
      </Modal>
    </View>
  );

}
const styles = StyleSheet.create({
  restaurantContainer: {
    height: 150,
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  restaurantHeader: {
    padding: 15,
    justifyContent: "space-between",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  restaurantName: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#bf1515",
  },
  showModalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemCount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },
  modalButtonText: {
    fontSize: 14,
    color: "#FFF",
  },
});
