import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getBarcode } from "../storage/barcodeRepository";
import RestaurantBarcode from "../components/RestaurantBarcodes";
import { router } from "expo-router";


export default function ListBarcode() {
  const [barcodes, setBarcodes] = useState<BarcodeData[]>([]);
  const [groupedBarcodes, setGroupedBarcodes] = useState<{ [key: string]: BarcodeData[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBarcode();
      setBarcodes(data);

      const grouped = data.reduce((acc: { [key: string]: BarcodeData[] }, item:BarcodeData) => {
        if (!acc[item.restaurant]) {
          acc[item.restaurant] = [];
        }
        acc[item.restaurant].push(item);
        return acc;
      }, {});
      setGroupedBarcodes(grouped);
    };

    fetchData();
  }, []);
  const showBarcode = (barcodes: BarcodeData[]) => {
    const barcodesJson = JSON.stringify(barcodes); 
    router.push(`../screens/showBarcode?data=${encodeURIComponent(barcodesJson)}`);
  };
  return (
    <View>
      {Object.keys(groupedBarcodes).map((restaurant) => (
        <RestaurantBarcode
          key={restaurant}
          barcodes={groupedBarcodes[restaurant]}
          funcPress={showBarcode}
        />
      ))}
    </View>
  );
}
