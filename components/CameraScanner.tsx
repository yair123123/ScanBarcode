import { CameraView } from "expo-camera";
import { StyleSheet } from "react-native";


const CameraScanner = ({ onBarcodeScanned, scanned, flashMode }: CameraScannerProps) => {

  return (
    <CameraView  enableTorch={flashMode} facing="back" onBarcodeScanned={scanned ? undefined : onBarcodeScanned} style={styles.camera} />
  );
};

export default CameraScanner;

const styles = StyleSheet.create({
  camera: { flex: 1 },

});
