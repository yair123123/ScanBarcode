import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { Alert, View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";
import * as Updates from "expo-updates";
import { useFocusEffect } from "@react-navigation/native";

export default function RootLayout() {
  const [didCheck, setDidCheck] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState("מתחיל בהורדת העדכון...");

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
                  setIsUpdating(true);
                  
                  setUpdateProgress("מוריד את העדכון האחרון...");
                  

                  setTimeout(() => setUpdateProgress("מכין את העדכון..."), 1500);
                  
                  await Updates.fetchUpdateAsync();
                  
                  setUpdateProgress("מחיל את העדכון החדש...");
                  setTimeout(() => setUpdateProgress("מפעיל מחדש את האפליקציה..."), 1000);
                  
                  setTimeout(async () => {
                    await Updates.reloadAsync();
                  }, 1500);
                  
                } catch (error) {
                  setIsUpdating(false);
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
      
      {/* Update Modal */}
      <Modal visible={isUpdating} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.updateBox}>
            <ActivityIndicator size="large" color="#0066cc" style={styles.spinner} />
            <Text style={styles.updateTitle}>מעדכן את האפליקציה</Text>
            <Text style={styles.updateText}>{updateProgress}</Text>
            <Text style={styles.updateSubtext}>אנא המתן, האפליקציה תופעל מחדש אוטומטית</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  spinner: {
    marginBottom: 16,
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  updateText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  updateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  }
});