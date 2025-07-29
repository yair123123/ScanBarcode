import React, { useState, useEffect } from "react";
import { Barcode } from 'expo-barcode-generator';
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native";
import Dropdown from "../../components/DropDown";
import { saveBarcode } from "../../storage/barcodeRepository";
import { restaurants } from "../../utils/images";

export default function InputDetails() {
    const [amount, onChangeAmount] = useState("");
    const [correctRestaurant, setCorrectRestaurant] = useState<string>("");
    const { data }: { data: string } = useLocalSearchParams();

    if (!data) {
        return <Text>No data provided</Text>;
    }


    const addBarcode = async () => {

        if (!amount || !correctRestaurant) {
            Alert.alert("שגיאה", "אנא מלא את כל השדות הדרושים.");
            return;
        }

        try {
            const now = new Date();
            const formattedDate = now.toLocaleDateString(); 
            const formattedTime = now.toLocaleTimeString();
            const res = await saveBarcode({
                is_active: true,
                amount: Number(amount),
                restaurant: correctRestaurant,
                value: data,
                date: formattedDate,
                time: formattedTime,
                usedAtTime: null,
                usedAtDate: null

            });

            if (res === true) {
                Alert.alert("נשמר!", "ברקוד נשמר בהצלחה!", [
                    {
                        text: "אישור",
                        onPress: () => router.push("/(tabs)")
                    }
                ]);
            } else {
                Alert.alert("שגיאה", "ברקוד כפול.");
            }
        } catch (error) {
            console.error("Error saving barcode:", error);
            Alert.alert("שגיאה", "אירעה שגיאה במהלך שמירת הברקוד.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.barcode}>
                <Barcode
                    value={data}
                    options={{ format: "CODE128", background: "lightblue" }}
                />
            </View>

            <View style={styles.dropdown}>
                <Dropdown
                    data={restaurants}
                    placeholder="בחר חנות"
                    onChange={(place) => setCorrectRestaurant(place.value)}
                />
            </View>

            <View style={styles.input}>
                <TextInput
                    value={amount}
                    onChangeText={onChangeAmount}
                    placeholder="הכנס סכום זיכוי"
                    keyboardType="numeric"
                    style={styles.inputField}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="הוסף זיכוי" onPress={addBarcode} color="#3498DB" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top:"25%",
        maxHeight: "50%",
        justifyContent: "space-between", // aligns children vertically from the top
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
    },
    barcode: {
        maxHeight: 150,
        alignSelf: "center",
    },
    dropdown: {
        width: "100%", // ensures it takes the full width of the container
    },
    input: {
        width: "100%", // ensures it takes the full width of the container
    },
    inputField: {
        height: 50,
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 18,
        paddingHorizontal: 40,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
        color: "#333333",
    },
    buttonContainer: {
        width: "100%",
    },
});
