import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View, Text } from "react-native";
import { saveRestaurant } from "../storage/restaurantRepository";
import { Restaurant } from "../interface/Restaurant";

interface AddRestaurantProps {
    onAdd: (restaurant: Restaurant) => void;
}

export default function AddRestaurant({ onAdd }: AddRestaurantProps) {
    const [input, setInput] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const addRestaurant = () => {
        if (!input) {
            setMessage('הזן שם של מסעדה');
            return;
        }

        const newRestaurant: Restaurant = { label: input, value: input };
        saveRestaurant(newRestaurant).then((data) => {
            setMessage(data ? 'המסעדה נוספה בהצלחה!' : 'שגיאה בהוספת מסעדה');
            onAdd(newRestaurant);  // מוסיף את המסעדה החדשה לרשימה שהתקבלה מההורה
        });

        setInput('');
        setTimeout(() => {
            setMessage('');
        }, 2000);
    };

    return (
        <View style={styles.container}>
            {message ? (
                <Text style={styles.message}>{message}</Text>
            ) : (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="הכנס שם חנות"
                    />
                    <Button title="הוסף חנות" color={"green"} onPress={addRestaurant} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row", // מציב את ה-input והכפתור אחד לצד השני
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: '60%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 8, // מרווח בין ה-input לכפתור
        paddingLeft: 8,
    },
    message: {
        marginTop: 16,
        color: 'green',
        fontWeight: 'bold',
    },
});
