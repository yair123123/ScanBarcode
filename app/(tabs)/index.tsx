import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Camera,CameraType, CameraView } from "expo-camera";
import {  useRouter } from "expo-router";

export default function Index() {
  const router = useRouter()
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(
    undefined
  );
  const [scanned, setScanned] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcode = ({ type, data }: { type: string; data: string }) => {
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
    <View style={styles.container}>
      <CameraView
      facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcode}
        style={StyleSheet.absoluteFillObject}
      />
      {barcodeData && <Text>Scanned Data: {barcodeData}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

