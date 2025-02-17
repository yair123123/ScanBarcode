import { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, StyleSheet, Animated, View, Dimensions, Vibration, Alert, Button, TouchableOpacity } from "react-native";
// import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';

import CameraScanner from "../../components/CameraScanner";
import Overlay from "../../components/Overlay";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalManualTyping from "@/components/ModalManualTyping";
import CustomButton from "@/ui/CustomButton";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";
import { scanBarcodeFromImage } from "@/utils/scanBarcode";


const { width, height } = Dimensions.get("window");

export default function Scan() {
  const {
    hasPermission,
    scanned,
    barcodeData,
    flashMode,
    setBarcodeData,
    setScanned, setFlashMode,
    handleBarcode
  } = useBarcodeScanner();

  const [manualModalVisile, setManualModalVisible] = useState(false);
  const [status, requestPermissions] = MediaLibrary.usePermissions()

  const lineAnimation = useRef(new Animated.Value(0)).current;

  if (status == null) {
    requestPermissions();
  }




  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // אפשר גם 'video/*' או '*/*' לכל הקבצים
      });
  
      if (!result.canceled) {
        scanBarcodeFromImage( result.assets[0].uri, handleBarcode);
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };






  if (!hasPermission) return <Text>Requesting permission...</Text>;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraScanner
          flashMode={flashMode}
          onBarcodeScanned={handleBarcode}
          scanned={scanned} />
        <View style={styles.textContainer}>
          <Text style={styles.text}> ממקמים את הברקוד ומתחילים בתהליך הסריקה</Text>
        </View>
        <Overlay lineAnimation={lineAnimation} height={height} width={width} />
        <View style={styles.buttonsContainer}>
          <CustomButton title="הקלדה ידנית" onPress={() => { setManualModalVisible(true) }}
          />
          <CustomButton title="העלה קובץ" onPress={() => { pickFile() }}
          />
        </View>
        <TouchableOpacity style={styles.flashlightContainer} onPress={() => { setFlashMode((prev) => { return !prev }) }}>
          <Ionicons style={{ zIndex: 100 }} name={flashMode ? 'flashlight' : 'flashlight-outline'} color={"white"} size={35} />
        </TouchableOpacity>
        <ModalManualTyping
          isVisible={manualModalVisile}
          setIsVisible={() => { setManualModalVisible(false) }}
          barcodeData={barcodeData}
          setBarcodeData={setBarcodeData}
          handleBarcode={handleBarcode}
          setScanned={setScanned}
        />
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  flashlightContainer: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 100,
  },
  container: { flex: 1 },
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
  buttonsContainer: {
    position: "absolute",
    zIndex: 10,
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",

  },
  textContainer: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
