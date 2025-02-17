
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { ImageBackground, StyleSheet, View, Text, Alert } from "react-native";
import { Barcode } from "expo-barcode-generator";
import CustomButton from "../../ui/CustomButton";
import EmptyBarcode from "@/components/EmptyBarcode";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import useBarcodeAnimation from "@/hooks/useBarcodeAnimation";
import { toggleIsActive } from "@/storage/barcodeRepository";
import Slider from "@/components/Slider";

export default function ShowBarcode() {
  const params = useLocalSearchParams();
  const [barcodes, setBarcodes] = useState<BarcodeData[]>(JSON.parse(params.data as string) as BarcodeData[]);
  const [correctBarcodeIndex, setCorrectBarcodeIndex] = useState<number>(
    JSON.parse(params.index as string) as number
  );
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <View style={styles.container}>
      <Slider setBarcodes={setBarcodes} currentIndex={correctBarcodeIndex} setCurrentIndex={setCorrectBarcodeIndex} barcodes={barcodes} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

})