import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import * as Updates from "expo-updates";
import { useFocusEffect } from "@react-navigation/native";

export default function RootLayout() {
  const [didCheck, setDidCheck] = useState(false);

  const checkForUpdates = async () => {
    if (didCheck) return; 
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          "עדכון זמין",
          "יש עדכון חדש לאפליקציה. האם תרצה להחיל אותו עכשיו?",
          [
            { text: "לא", style: "cancel" },
            {
              text: "כן",
              onPress: async () => {
                try {
                  await Updates.fetchUpdateAsync();
                  await Updates.reloadAsync();
                } catch (error) {
                  Alert.alert("שגיאה", "נכשל בעדכון האפליקציה. נסה שוב מאוחר יותר.");
                  console.error("Error fetching update:", error);
                }
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    } finally {
      setDidCheck(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkForUpdates();
    }, [])
  );

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="screens/show" options={{ presentation: "modal", headerShown: false }} />
        <Stack.Screen name="screens/detailsBarcode" options={{ presentation: "modal", headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
