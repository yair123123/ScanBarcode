import React, { useState } from "react";
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
    const [restraunts, setRestaurants] = useState<Restaurant[]>([]);
    const [correctRestaurant,setCorrectRestaurant] = useState<string>('')
    const { data }: { data: string } = useLocalSearchParams();
    if (!data) {
        return <Text>No data provided</Text>;
    }


    const places = async () => (await getAllRestaurants())
    places().then((data) => {setRestaurants(data)});

    const addBarcode = () => {
        saveBarcode({amount: Number(coust), restraunt:correctRestaurant, value:data})
        Alert.alert("נשמר!","ברקוד נשמר בהצלחה!", [
            {
                text: "אישור",
                onPress: () => router.push("/(tabs)/listBarcode")
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Text>{data}</Text>
            <Barcode
                value={data}
                options={{ format: 'EAN13', background: 'lightblue' }}
            />
            <Dropdown
                data={restraunts}
                placeholder="Select a restaurant"
                onChange={(places) => setCorrectRestaurant(places.value)
                }
            />
            <AddRestaurant />
            <TextInput
                value={coust}
                onChangeText={onChangeCoust}
                placeholder="Please enter your sum"
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Add barcode" onPress={addBarcode}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
});
