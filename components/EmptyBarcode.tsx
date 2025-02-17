import CustomButton from "@/ui/CustomButton"
import { router } from "expo-router"
import { View,Text,StyleSheet } from "react-native"

export default function EmptyBarcode() {
    return (
        <View style={styles.container}>
                <Text style={styles.message}>אין יותר ברקודים להצגה!</Text>
            <View style={styles.buttonsContainer}>
                <CustomButton onPress={() => { router.push("/(tabs)/scan") }} title="סריקת ברקוד חדש" />
                <CustomButton onPress={() => { router.push("/(tabs)") }} title="חזור" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
},
buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%"
},

});
