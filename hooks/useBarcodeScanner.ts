import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import { errorVibration, successVibration } from "../utils/vibrationPattern";

export const useBarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(undefined);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");
  const [flashMode, setFlashMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcode = ({ type, data }: { type: string; data: string }) => {
    if (type !== "code128" || (data.length !== 16 && data.length !== 17)) {
      errorVibration();
      setScanned(true);
      alert("הברקוד צריך להיות בפורמט CODE128");
      setScanned(false);
      return;
    }
    successVibration();
    setBarcodeData(data);
    router.push(`../screens/detailsBarcode?data=${data}`);
  };

  return { hasPermission, scanned, barcodeData, flashMode, setScanned,setBarcodeData, setFlashMode, handleBarcode };
};
