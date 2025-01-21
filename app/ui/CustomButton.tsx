import { StyleSheet } from "react-native"
import { TouchableOpacity ,Text} from "react-native"

export default function CustomButton({ onPress, title }:Button){
    return(
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
)};

const styles =StyleSheet.create({ button: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "blue",
    padding: 10
},
buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
}})