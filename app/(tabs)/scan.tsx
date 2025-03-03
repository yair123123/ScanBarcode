import { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, StyleSheet, Animated, View, Dimensions, TouchableOpacity } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from "@expo/vector-icons/Ionicons";

import CameraScanner from "../../components/CameraScanner";
import Overlay from "../../components/Overlay";
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
    setScanned, 
    setFlashMode,
    handleBarcode
  } = useBarcodeScanner();

  const [manualModalVisible, setManualModalVisible] = useState(false);
  const [mediaPermission, requestMediaPermissions] = MediaLibrary.usePermissions();
  const lineAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (mediaPermission === null) {
      requestMediaPermissions();
    }
  }, [mediaPermission, requestMediaPermissions]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: false,
      mediaTypes: ['images']
    });
    
    if (!result.canceled && result.assets.length > 0) {
      await scanBarcodeFromImage(result.assets[0].uri, handleBarcode);
    }
  };

  const toggleFlashMode = () => setFlashMode(prev => !prev);
  
  if (!hasPermission) return <Text>Requesting camera permission...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {manualModalVisible ? (
        <View style={styles.containerModal}>
          <ModalManualTyping
            isVisible={manualModalVisible}
            setIsVisible={() => setManualModalVisible(false)}
            barcodeData={barcodeData}
            setBarcodeData={setBarcodeData}
            handleBarcode={handleBarcode}
            setScanned={setScanned}
          />
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraScanner
            flashMode={flashMode}
            onBarcodeScanned={handleBarcode}
            scanned={scanned}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>ממקמים את הברקוד ומתחילים בתהליך הסריקה</Text>
          </View>
          <Overlay lineAnimation={lineAnimation} height={height} width={width} />
          
          <TouchableOpacity 
            style={styles.flashlightContainer} 
            onPress={toggleFlashMode}
          >
            <Ionicons 
              name={flashMode ? 'flashlight' : 'flashlight-outline'} 
              color="white" 
              size={35} 
            />
          </TouchableOpacity>
          
          <View style={styles.buttonsContainer}>
            <CustomButton 
              title="הקלדה ידנית" 
              onPress={() => setManualModalVisible(true)} 
            />
            <CustomButton 
              title="העלה תמונה" 
              onPress={pickImage} 
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  containerModal: {
    backgroundColor: "rgb(0, 0, 0)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
  },
  flashlightContainer: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 100,
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