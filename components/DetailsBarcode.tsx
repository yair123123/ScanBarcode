import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native"
import { Barcode } from 'expo-barcode-generator';
import {  navigateToBarcodeScreen, sortByAmount } from "@/utils/showBarcode";
import { restaurants } from "@/utils/images";

type props = {
    markBarcodeAsUsed: (barcodeData: BarcodeData,value:string,restaurant:string) => void,
    deleteBarcode: (value:string,restaurant:string) => void
    barcodeData: BarcodeData,
    barcodes: { [key: string]: BarcodeData[] },
    barcodesToShow: BarcodeData[],
    index: number,
    toggleModal: () => void,
}

export default function DetailsBarcode({deleteBarcode,markBarcodeAsUsed ,barcodeData, index, toggleModal, barcodesToShow }: props) {
    const { amount, value, date, time,restaurant } = barcodeData;
    const moveToTop = (arr, index) => {
        if (index < 0 || index >= arr.length) return arr; // בדיקה שהאינדקס תקף
        const [item] = arr.splice(index, 1); // מוציאים את האיבר מהמערך
        arr = sortByAmount(arr);
        arr.unshift(item); // מכניסים אותו לראש הרשימה
        return arr;
      }
    return (
        <TouchableOpacity onPress={() => { toggleModal(); navigateToBarcodeScreen(moveToTop(barcodesToShow,index)) }} style={styles.container}>
            <View style={styles.barcode}>
                <Barcode
                    value={value}
                    options={{
                        format: "CODE128",
                        background: "lightblue",
                        width: value.length === 17 ? 1.5 : 1.79,
                        height: 50,
                        fontOptions: "bold",
                    }}
                />
            </View>
            <View style={styles.details}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.time}>{time}</Text>
                <Text style={styles.amount}>{amount} ש"ח</Text>
            </View>
            <View style={styles.barcodeButtons}>
                <Button color={"green"} title="סמן כמומש" onPress={() => {markBarcodeAsUsed(barcodeData,value,restaurant)}} />
                <Button color={"red"} title="מחק" onPress={() => {deleteBarcode(value,restaurant)}} />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#D1D1D1",
        padding: 10,
        backgroundColor: "transparent",
    },
    barcode: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    details: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    amount: {
        fontSize: 16,
        color: "#bf1515",
    },
    barcodeButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    }
});
