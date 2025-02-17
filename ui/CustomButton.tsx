import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress, disabled, style }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={StyleSheet.flatten([styles.button, style, disabled && styles.disabled])}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    disabled: {
        backgroundColor: "gray",
    },
    text: {
        color: "white",
        fontSize: 16,
    }
});
