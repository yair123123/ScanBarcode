import { View, Text, StyleSheet, Button } from "react-native";
import { Barcode } from 'expo-barcode-generator';
import CustomButton from "@/ui/CustomButton";
import { parseRestaurantToHebrow } from "@/utils/images";



type Props = {
    data: BarcodeData;
    deleteFunc: (value: string, restaurant: string) => void;
    unmarkFunc: (data:BarcodeData,value: string, restaurant: string) => void;
};

export default function InactiveBarcode({ data, deleteFunc,unmarkFunc }: Props) {
    const { amount, date, restaurant, time, usedAtDate, usedAtTime, value } = data;


    return (
        <View style={styles.container}>
            <View style={styles.containerBarcodeButtons}>
                <Barcode
                    value={value}
                    options={{
                        format: "CODE128",
                        background: "grey",
                        width: value.length === 17 ? 1.5 : 1.79,
                        height: 70,
                        fontOptions: "bold",
                    }} />
                <View style={styles.containerButtons}>
                    <CustomButton title={"מחק"} onPress={() => {deleteFunc(value,restaurant)}} style={{ backgroundColor: "red" }} />
                    <CustomButton title={"שחזר"} onPress={() => {unmarkFunc(data,value,restaurant)}} style={{ backgroundColor: "green" }} />
                </View>
            </View>
            <View style={styles.containerDetails}>
                <View>
                    <Text>נוסף ב</Text>
                    <Text>{time}</Text>
                    <Text>{date}</Text>
                </View>
                <View>
                    <Text>שומש ב</Text>
                    <Text>{usedAtTime}</Text>
                    <Text>{usedAtDate}</Text>
                </View>
                <Text>{amount} ש"ח</Text>
                <Text>{parseRestaurantToHebrow(restaurant)}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        backgroundColor: "white",
    },
    containerBarcodeButtons: {

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomColor: "lightgray",
        backgroundColor: "white",

    }


    ,
    containerButtons: {
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        gap: 30,

    },
    containerDetails: {
        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        gap: 30,

    }
})
