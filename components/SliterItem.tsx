import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Barcode } from 'expo-barcode-generator';

type SliderItemProps = {
    item: BarcodeData,
    index: number
}
const { width } = Dimensions.get("screen")
const SliderItem: React.FC<SliderItemProps> = ({ item, index }) => {
    const { value, restaurant, amount, date, time, is_active } = item
    return (
        <View style={styles.container}>

            <View style={styles.itemContainer}>
                <Text style={styles.amount}>{amount} ש"ח</Text>
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
                    {!is_active &&
                        <View style={{ justifyContent:"center",alignItems:"center",position: "absolute", width: "100%", height: "100%" }}
                        >
                            <Text style={styles.overlayStripe}>שומש</Text>

                        </View>
                    }

                </View>
                <View style={styles.details}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlayStripe: {
        fontSize:50,
        fontWeight: 'bold',
        color:"red",
        transform: [{ rotate: '10deg' }],
        
    },
    container: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        width: 300,
        height: 300,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        gap: 20
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    barcode: {
        position: "relative",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    details: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
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
        fontSize: 30,
        color: "#bf1515",
    },
});

export default SliderItem;