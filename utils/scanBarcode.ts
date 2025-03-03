import { Camera } from "expo-camera";
import { Alert } from "react-native";



const scanBarcodeFromImage = async (imageUri: string, handleBarcode: (barcode: { type: string, data: string }) => void) => {
    

    try {
        const barcodes = await Camera.scanFromURLAsync(imageUri, ["code128"]);
        if (barcodes.length > 0) {

            handleBarcode({ type: "code128", data: barcodes[0].data });
        } else {
            Alert.alert("לא נמצא ברקוד בתמונה");
        }
    } catch (error) {
        Alert.alert("שגיאה בסריקה", (error as Error).message);
    }
};

export { scanBarcodeFromImage };
