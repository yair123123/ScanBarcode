import { getBarcode } from "@/storage/barcodeRepository";
import CustomButton from "@/ui/CustomButton";
import { router } from "expo-router";
import { Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
type props = {
    isVisible: boolean;
    setIsVisible: () => void;
    setScanned: (arg0:boolean) => void;
    barcodeData: string;
    setBarcodeData: (data: string) => void;
    handleBarcode: (data: { type: string; data: string }) => void;
}

export default function ModalManualTyping({ isVisible,handleBarcode, setIsVisible, setScanned, barcodeData, setBarcodeData }: props) {
    return (
        <Modal
            transparent={true}
            visible={isVisible}>

            <TouchableWithoutFeedback onPress={() => { setIsVisible(); setScanned(false) }}>
                <View style={styles.containerOverlay}>
                    <View
                        onStartShouldSetResponder={() => true}
                        style={styles.container}>
                        <View style={styles.inputContainer}>
                            <TextInput value={barcodeData} onChangeText={setBarcodeData} keyboardType={"number-pad"} style={styles.input} placeholder="הכנס ברקוד כאן" />
                            <CustomButton 
                            onPress={() => { setIsVisible();handleBarcode({data: barcodeData ,type:"code128"}) }} 
                            title="הוסף" />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    );
}
const styles = StyleSheet.create({
    containerOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    container: {
        width: 320,
        paddingVertical: 20,
        backgroundColor: "white",
        borderRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
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
    }
})