import { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, StyleSheet, Animated, View, Dimensions, Vibration, Alert } from "react-native";
import { useRouter } from "expo-router";
import CameraScanner from "../components/CameraScanner";
import BarcodeInput from "../components/BarcodeInput";
import { Camera } from "expo-camera";
import Overlay from "../components/Overlay";
import { errorVibration, successVibration } from "../utils/vibrationPattern";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(undefined);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");

  const lineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcode = ({ type, data }: { type: string; data: string }) => {
    console.log(data.length);

    if (type !== "code128" || data.length !== 17 && data.length !== 16) {
      errorVibration()
      setScanned(true)
      Alert.alert("לא בפורמט", "הברקוד צריך להיות בפורמט CODE128",
        [{
          text: "אישור",
          onPress: (() => { setScanned(false) })
        }]
      );
      return;
    }
    successVibration()
    setBarcodeData(data);
    router.push("../screens/detailsBarcode ? data = ${ data }");
  };

  if (!hasPermission) return <Text>Requesting permission...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraScanner onBarcodeScanned={handleBarcode} scanned={scanned} />
        <Overlay lineAnimation={lineAnimation} height={height} width={width} />
        <View style={styles.barcodeInput}>
          <BarcodeInput 
            barcodeData={barcodeData} 
            setBarcodeData={setBarcodeData} 
            handleBarcode={handleBarcode} 
            scanned={scanned} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
  barcodeInput:{
    
    zIndex:10,
    position:"absolute",
    top: 20, 
    left: 0,
    right: 0,
    alignItems: "center",
  }
});
