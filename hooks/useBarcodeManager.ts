import { deleteBarcodeByValue, getBarcodes, updateBarcodeStatus } from "@/storage/barcodeRepository";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export default function useBarcodeManager() {

    const [inactiveBarcodes, setInactiveBarcodes] = useState<{ [key: string]: BarcodeData[] }>({});
    const [activeBarcodes, setActiveBarcodes] = useState<{ [key: string]: BarcodeData[] }>({});

    const fetchData = useCallback(async () => {
        const data = await getBarcodes();
        const { activeGrouped, inactiveGrouped } = data.reduce((acc: { activeGrouped: { [key: string]: BarcodeData[] }, inactiveGrouped: { [key: string]: BarcodeData[] } }, item: BarcodeData) => {
            const groupKey = item.is_active ? "activeGrouped" : "inactiveGrouped";
            if (!acc[groupKey][item.restaurant]) {
                acc[groupKey][item.restaurant] = [];
            }
            acc[groupKey][item.restaurant].push(item);

            return acc;
        }, { activeGrouped: {}, inactiveGrouped: {} });
        setActiveBarcodes(activeGrouped);
        setInactiveBarcodes(inactiveGrouped);


    }, []);

    const markBarcodeAsUsed = async (barcodeData: BarcodeData, value: string, restaurant: string) => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();
        const newBarcode = { ...barcodeData, is_active: false, usedAtDate: formattedDate, usedAtTime: formattedTime };
        updateBarcodeStatus(newBarcode);

        setInactiveBarcodes((prev) => {
            if (!prev[restaurant]) prev[restaurant] = [];
            return { ...prev, [restaurant]: [...prev[restaurant], newBarcode] };
        });

        setActiveBarcodes((prev) => {
            const newBarcodes = prev[restaurant]?.filter((item) => item.value !== value) || [];
            const updated = { ...prev };
            if (newBarcodes.length === 0) {
                delete updated[restaurant];
            } else {
                updated[restaurant] = newBarcodes;
            }
            return updated;
        });
    };


    const unmarkBarcodeAsUsed = (barcodeData: BarcodeData, value: string, restaurant: string) => {
        const newBarcode = { ...barcodeData, is_active: true, usedAtDate: null, usedAtTime: null };
        updateBarcodeStatus(newBarcode);

        setInactiveBarcodes((prev) => {
            const newBarcodes = prev[restaurant]?.filter((item) => item.value !== value) || [];
            const updated = { ...prev };
            if (newBarcodes.length === 0) {
                delete updated[restaurant];
            } else {
                updated[restaurant] = newBarcodes;
            }
            return updated;
        });

        setActiveBarcodes((prev) => {
            if (!prev[restaurant]) prev[restaurant] = [];
            return { ...prev, [restaurant]: [...prev[restaurant], newBarcode] };
        });
    };


    const deleteBarcode = (value: string, restaurant: string) => {
        Alert.alert("🛑 האם אתה בטוח?", "פעולה זו אינה ניתנת להפיכה", [
            {
                text: "ביטול",
                style: "cancel",
            },
            {
                text: "אישור",
                style: "destructive",
                onPress: () => {
                    deleteBarcodeByValue(value);

                    setInactiveBarcodes((prev) => {
                        const newBarcodes = prev[restaurant]?.filter((item) => item.value !== value) || [];
                        const updated = { ...prev };
                        if (newBarcodes.length === 0) {
                            delete updated[restaurant]; // מוחק את המסעדה אם אין יותר ברקודים
                        } else {
                            updated[restaurant] = newBarcodes;
                        }
                        return updated;
                    });

                    setActiveBarcodes((prev) => {
                        const newBarcodes = prev[restaurant]?.filter((item) => item.value !== value) || [];
                        const updated = { ...prev };
                        if (newBarcodes.length === 0) {
                            delete updated[restaurant]; // מוחק את המסעדה אם אין יותר ברקודים
                        } else {
                            updated[restaurant] = newBarcodes;
                        }
                        return updated;
                    });
                },
            },
        ]);
    };

    return {
        fetchData,
        markBarcodeAsUsed,
        unmarkBarcodeAsUsed,
        deleteBarcode,
        setActiveBarcodes,
        activeBarcodes,
        inactiveBarcodes,
    }

}