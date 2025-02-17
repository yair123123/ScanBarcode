import { View, Text, FlatList, StyleSheet, ViewToken, Dimensions, ImageBackground, Alert } from 'react-native';
import SliderItem from './SliterItem';
import React, { useRef, useState } from 'react';
import CustomButton from '@/ui/CustomButton';
import { router } from 'expo-router';
import { makeBarcodeUnusable } from '@/utils/showBarcode';
import { toggleIsActive } from '@/storage/barcodeRepository';

interface SliderProps {
    barcodes: BarcodeData[];
    currentIndex: number
    setCurrentIndex: (num: number) => void
    setBarcodes: (barcodes: BarcodeData[]) => void
}
const { width } = Dimensions.get("screen")

export default function Slider({ setBarcodes, barcodes, currentIndex, setCurrentIndex }: SliderProps) {

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
        }
    }).current;

    const barcodeUsed = async () => {
        const newBarcode = makeBarcodeUnusable(barcodes[currentIndex])
        const updatedBarcodes = barcodes.map((barcode, index) => (index === currentIndex ? newBarcode : barcode));
        setBarcodes(updatedBarcodes);
        toggleIsActive(newBarcode)
        Alert.alert( "אישור","ברקוד שומש בהצלחה!!")
      }


    return (
        <View>
            <ImageBackground source={require("@/assets/images/GoldisBackground.jpg")} style={styles.imageBackground} />

            <FlatList
                data={barcodes}
                renderItem={({ item, index }) => (
                    <SliderItem item={item} index={index} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={currentIndex} // 👈 התחל מהפריט השלישי (האינדקס מתחיל מ-0)
                pagingEnabled
                onViewableItemsChanged={onViewableItemsChanged}
                getItemLayout={(data, index) => ({
                    length: width, // 👈 גודל כל פריט (חייב להיות קבוע כדי שזה יעבוד)
                    offset: width * index,
                    index
                })}
            />
            <View style={styles.indexIndicator}>
                <CustomButton style={[styles.button, { backgroundColor: "green" }]} onPress={(barcodeUsed)} title={"סרקתי בהצלחה"} disabled={!barcodes[currentIndex].is_active} />
                <CustomButton style={[styles.button, { backgroundColor: "blue" }]} onPress={() => { router.replace('/(tabs)/scan') }} title={"סרוק ברקוד חדש"} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    indexIndicator: {
        width: "100%",
        position: "absolute",
        bottom: 100,

        gap: 15
    },
    button: {
        alignItems: "center",
        justifyContent: "space-around",
        alignSelf: "center",
        borderRadius: 10,
        color: "white",
        paddingHorizontal: 25,
        fontSize: 16
    },
    imageBackground: { ...StyleSheet.absoluteFillObject, opacity: 0.4 },

});
