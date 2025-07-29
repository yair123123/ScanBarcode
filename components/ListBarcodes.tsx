import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import DetailsBarcode from "./DetailsBarcode";
import { parseRestaurantToHebrew } from "../utils/images";
import { useState } from "react";
type props = {
    barcodes: { [key: string]: BarcodeData[] }
    barcodesToShow: BarcodeData[],
    toggleModal: () => void,
    restaurantName: string
    deleteBarcode: (value:string,restaurant:string) => void,
    markBarcodeAsUsed: (barcodeData: BarcodeData,value:string,restaurant:string) => void,
}

export function ListBarcodes({ toggleModal, barcodesToShow, restaurantName, deleteBarcode,markBarcodeAsUsed ,barcodes}: props) {
    
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{`ברקודים למסעדה ${parseRestaurantToHebrew(restaurantName)}`}</Text>
                <FlatList
                    contentContainerStyle={{ paddingVertical: 10 }}
                    data={barcodesToShow}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item, index }: { item: BarcodeData, index: number }) => (
                        <View style={styles.barcodeItem}>
                            <DetailsBarcode barcodeData={item} index={index} deleteBarcode={deleteBarcode} markBarcodeAsUsed={markBarcodeAsUsed} barcodesToShow={barcodesToShow} barcodes={barcodes} toggleModal={toggleModal} />

                        </View>
                    )}
                />
                <Button title="סגור" onPress={toggleModal} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        maxHeight: "100%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    barcodeDetails: {
        marginBottom: 20, // מרווח בין ברקודים
    },
    barcodeItem: {
        marginBottom: 10, // מרווח בין פריטים
        flexDirection: "row",
    },

});
