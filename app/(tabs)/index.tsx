import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Alert, SafeAreaView } from "react-native";
import { Camera, CameraType, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { getBarcode } from "../storage/barcodeRepository";
import CustomButton from "../ui/CustomButton";

export default function Index() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(undefined);
  const [scanned, setScanned] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<string>("");
  const [barcodes, setBarcodes] = useState<BarcodeData[]>([]);

  useEffect(() => {
    (async () => {
      const barcodes = getBarcode();
      setBarcodes(barcodes); 
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcode = ({ type, data }: { type: string; data: string }) => {
    console.log(data.length);
    
    if (type !== "code128" || data.length !== 17 && data.length !== 16) {
      Alert.alert("לא בפורמט", "הברקוד צריך להיות בפורמט CODE128");
      return;
    }
    setScanned(true);
    setBarcodeData(data);
    router.push(`../screens/detailsBarcode?data=${data}`);
  };

  if (hasPermission == null) {
    return <Text>Requesting permission...</Text>;
  }
  if (hasPermission == false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcode}
          style={styles.camera}
        />
      </View>
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
          onPress={() => { scanned ? undefined : handleBarcode({ type: "code128", data: barcodeData }) }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // מאפשר למלא את כל המסך
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1, // מאכסן את ה-CameraView כך שיתפוס את כל המקום הפנוי
    width: "100%",
  },
  camera: {
    flex: 1, // זה חשוב כדי שהתמונה תתפוס את כל המסך
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // נותן את המיקום המתואם
    bottom: 50, // המרחק מהמכסה התחתון, תוכל לשנות לפי הצורך
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 8, 
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#333333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flex: 1, // מבטיח שהטקסט יוכל למלא את השטח
  },
});
