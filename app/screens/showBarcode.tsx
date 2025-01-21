import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Barcode } from "expo-barcode-generator";
import { Button, ImageBackground, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { deleteBarcodeByValue } from "../storage/barcodeRepository";
import CustomButton from "../ui/CustomButton";

export default function ShowBarcode() {
    const { data } = useLocalSearchParams();
    const parsedData = typeof data === 'string' ? data : data[0];
    const [barcodes, setBarcodes] = useState<BarcodeData[]>(JSON.parse(parsedData));
    const [refreshKey, setRefreshKey] = useState(0);

    const correctBarcode = useMemo(() => {
        return barcodes.reduce((min: BarcodeData, current: BarcodeData) => {
            return current.amount < min.amount ? current : min;
        }, barcodes[0]);
    }, [barcodes]);

    const deleteAndScanNew = () => {
        deleteBarcodeByValue(correctBarcode.value);
        router.push("/(tabs)");
    };

    const deleteAndShowAnother = () => {
        deleteBarcodeByValue(correctBarcode.value);
        setBarcodes((prev) => prev.filter((b) => b.value !== correctBarcode.value));

        if (barcodes.length === 1) { 
            Alert.alert("אין יותר זיכויים!","", [
                { text: "אישור", onPress: () => console.log("אישור") },
                { text: "סריקת ברקוד חדש", onPress: () => router.push("/(tabs)")},
            ]);
        } else {
            setRefreshKey((prevKey) => prevKey + 1);
        }
    };

    if (barcodes.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <Text style={styles.message}>אין יותר ברקודים להצגה!</Text>
                    <CustomButton onPress={() => {router.push("/(tabs)")}} title="סריקת ברקוד חדש" />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require("@/assets/images/GoldisBackground.jpg")} style={styles.imageBackground} />
            <View style={styles.barcodeContainer}>
                <Text style={styles.amountCorrectBarcode}>{correctBarcode.amount} ₪</Text>
                <Barcode
                    key={refreshKey}
                    value={correctBarcode.value}
                    options={{ format: "CODE128", background: "lightblue" }}
                    style={styles.barcode}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <CustomButton onPress={deleteAndScanNew} title="מחיקת ברקוד וסריקת ברקוד חדש" />
                <CustomButton onPress={deleteAndShowAnother} title="מחיקת ברקוד והצגת ברקוד הבא" />
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255,255,255,0.8)" },
    imageBackground: { ...StyleSheet.absoluteFillObject, opacity: 0.4 },
    barcodeContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    barcode: {
        margin: 8,
        transform: [{ scale: 1.2 }]
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "80%"
    },

    message: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "red",
    },
    amountCorrectBarcode:{
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "lightblue", 
        shadowColor: "#333",

    }
});
