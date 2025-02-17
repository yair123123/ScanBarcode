import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import RestaurantBarcode from "../../components/RestaurantBarcodes";
import EmptyState from "@/components/EmptyState";
import { showBarcode } from "@/utils/showBarcode";
import ListInactiveBarcodes from "@/components/ListInactiveBarcode";
import { restaurants } from "@/utils/images";
import useBarcodeUsed from "@/hooks/useBarcodeUsed";

export default function Index() {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    deleteBarcode,
    fetchData,
    activeBarcodes,
    inactiveBarcodes,
    unmarkBarcodeAsUsed,
    markBarcodeAsUsed
  } = useBarcodeUsed();
  const [showActive, setshowActive] = useState<boolean>(true);



  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [activeBarcodes, inactiveBarcodes]);


  useFocusEffect(
    useCallback(() => {
      fetchData(); // מפעיל את הפונקציה מתוך ה-Hook במקום לקרוא ל-Hook עצמו
    }, [fetchData])
  );


  if (!showActive) {
    return (
      <View style={{ flex: 1 }}>
        <Button color={"green"} title="הצג ברקודים פעילים" onPress={() => setshowActive(true)} />
        <ListInactiveBarcodes unmarkFunc={unmarkBarcodeAsUsed} deleteFunc={deleteBarcode} barcodes={inactiveBarcodes} />
      </View>
    )
  }
  return (
    <View key={refreshKey} style={{ flex: 1 }}>
      <Button color={"grey"} title="הצג ברקודים לא פעילים" onPress={() => setshowActive(false)} />
      {Object.keys(activeBarcodes).length === 0 ? (
        <EmptyState />
      ) : (

        <View >
          {Object.keys(activeBarcodes).map((restaurant) => {
            return (
              <RestaurantBarcode
                key={restaurant}
                deleteBarcode={deleteBarcode}
                markBarcodeAsUsed={markBarcodeAsUsed}
                restaurant={restaurant}
                barcodes={activeBarcodes}
                funcPress={showBarcode}
              />)
          })}
        </View>
      )}
    </View>
  );
}  