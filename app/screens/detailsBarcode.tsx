import React, { useState, useEffect } from "react";
import { Barcode } from 'expo-barcode-generator';
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native";
import Dropdown from "../components/DropDown";
import AddRestaurant from "../components/AddRestaurant";
import { getAllRestaurants } from "../storage/restaurantRepository";
import { Restaurant } from "../interface/Restaurant";
import { saveBarcode } from "../storage/barcodeRepository";

export default function InputDetails() {
    const [coust, onChangeCoust] = useState("");
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [correctRestaurant, setCorrectRestaurant] = useState<string>("");
    const { data }: { data: string } = useLocalSearchParams(); 

    if (!data) {
        return <Text>No data provided</Text>;
    }

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await getAllRestaurants();
                setRestaurants(data);
            } catch (error) {
                console.error("Failed to fetch restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []); // Runs once when the component is loaded

    const handleAddRestaurant = (newRestaurant: Restaurant) => {
        setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
    };

    const addBarcode = async () => {
        if (!coust || !correctRestaurant) {
            Alert.alert("שגיאה", "אנא מלא את כל השדות הדרושים.");
            return;
        }

        try {
            const res = await saveBarcode({ amount: Number(coust), restaurant: correctRestaurant, value: data });

            if (res === true) {
                Alert.alert("נשמר!", "ברקוד נשמר בהצלחה!", [
                    {
                        text: "אישור",
                        onPress: () => router.push("/(tabs)/listBarcode")
                    }
                ]);
            } else {
                Alert.alert("שגיאה", "שמירת הברקוד נכשלה.");
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
                    value={coust}
                    onChangeText={onChangeCoust}
                    placeholder="הכנס סכום זיכוי"
                    keyboardType="numeric"
                    style={styles.inputField}
                />
            </View>
    
            <View style={styles.buttonContainer}>
                <Button title="הוסף זיכוי" onPress={addBarcode} color="#3498DB" />
            </View>

            <View style={styles.addRestaurantContainer}>
                <AddRestaurant onAdd={handleAddRestaurant} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start", // aligns children vertically from the top
        alignItems: "center", // aligns children horizontally in the center
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
    },
    barcode: {
        maxHeight: 150,
        marginVertical: 20,
        alignSelf: "center",
    },
    dropdown: {
        marginBottom: 20,
        width: "100%", // ensures it takes the full width of the container
    },
    input: {
        marginBottom: 15,
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
        width: "100%", // Ensures button takes full width
        marginBottom: 20,
    },
    addRestaurantContainer: {
        marginTop: 20,
        width: "100%",
    }
});
