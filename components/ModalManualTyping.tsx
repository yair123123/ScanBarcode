import { getBarcode } from "@/storage/barcodeRepository";
import CustomButton from "@/ui/CustomButton";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

type props = {
    isVisible: boolean;
    setIsVisible: () => void;
    setScanned: (arg0:boolean) => void;
    barcodeData: string;
    setBarcodeData: (data: string) => void;
    handleBarcode: (data: { type: string; data: string }) => void;
}

export default function ModalManualTyping({ isVisible, handleBarcode, setIsVisible, setScanned, barcodeData, setBarcodeData }: props) {
    const [hasInputChanged, setHasInputChanged] = useState(false);
    
    // Reset the input changed flag when modal is opened
    useEffect(() => {
        if (isVisible) {
            setHasInputChanged(false);
        }
    }, [isVisible]);
    
    const validation = (barcodeData:string) =>(
        barcodeData.length < 16 ? {valid:false, color: "red", message: "❌ הברקוד קצר מדי (לפחות 16 ספרות)"} :
        barcodeData.length < 17 ? {valid:true, color: "orange", message:"⚠️ גבולי - לעיתים מתקבל, כדאי לבדוק שוב"} :
        barcodeData.length > 17 ? {valid:false, color: "red", message:"🚫 הברקוד ארוך מדי (מקסימום 17 ספרות)"} :
        {valid:true, color: "green", message:"✅ מעולה! הברקוד תקין 🎉"}
    )
    
    const {valid, color, message} = validation(barcodeData);
    
    const handleInputChange = (text: string) => {
        setBarcodeData(text);
        setHasInputChanged(true);
    };
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}>

            <TouchableWithoutFeedback onPress={() => { setIsVisible(); setScanned(false) }}>
                <View style={styles.containerOverlay}>
                    <View
                        onStartShouldSetResponder={() => true}
                        style={styles.container}>
                        <View style={styles.inputContainer}>
                            <Text style={{alignSelf:"flex-end"}}>הקלדה ידנית</Text>
                            <TextInput 
                                value={barcodeData} 
                                onChangeText={handleInputChange}
                                keyboardType={"number-pad"} 
                                style={styles.input} 
                                placeholder="הכנס ברקוד כאן" 
                            />
                            {hasInputChanged && (
                                <Text style={[styles.text, {color: color}]}>{message}</Text>
                            )}
                            <CustomButton 
                                disabled={!valid}
                                onPress={() => { setIsVisible(); handleBarcode({data: barcodeData, type:"code128"}) }} 
                                title="הוסף" 
                            />
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
        justifyContent: "flex-end",
    },
    container: {
        width: "100%",
        height:"30%",
        paddingHorizontal: 20,
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
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 10,
        gap: 20,
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
        color: "#333333",
    },
    text:{
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    }
})