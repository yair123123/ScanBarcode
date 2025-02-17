import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function ButtonContactUs({onPress}:{ onPress:() => void}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image
                source={require("@/assets/images/contactUs.jpg")}
                style={styles.image}
            />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 50,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 85,
        height: 85,

    }

})