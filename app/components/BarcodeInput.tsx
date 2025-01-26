import { View, TextInput, StyleSheet } from "react-native";
import CustomButton from "../ui/CustomButton";


    
const BarcodeInput: React.FC<BarcodeInputProps> = ({ barcodeData, setBarcodeData, handleBarcode, scanned } : BarcodeInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={barcodeData}
        onChangeText={setBarcodeData}
        placeholder="הקלדה ידנית"
        keyboardType="numeric"
        style={styles.input}
      />
      <CustomButton
        title="הוסף"
        onPress={() => {
          scanned ? undefined : handleBarcode({ type: "code128", data: barcodeData });
        }}
      />
    </View>
  );
};

export default BarcodeInput;

const styles = StyleSheet.create({
  inputContainer: {

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#333333",
    flex: 1,
    marginRight: 10,
  },
});
