import { router } from "expo-router";

export const showBarcode = (barcodes: BarcodeData[],indexBarcode:number) => {
    const barcodesJson = JSON.stringify(barcodes);
    console.log("route...");
    
    router.push(`/screens/show?data=${encodeURIComponent(barcodesJson)}&index=${encodeURIComponent(JSON.stringify(indexBarcode))}`);
  };
  export const findBarcodeLowestIndex = (barcodes: BarcodeData[]) => {
    return barcodes.reduce((minIndex, current, index, array) => {
        return current.amount < array[minIndex].amount ? index : minIndex;
    }, 0);
};

export const makeBarcodeUnusable = (barcode:BarcodeData) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();
  const newBarcode = { ...barcode, is_active: false, usedAtDate: formattedDate, usedAtTime: formattedTime };
  return newBarcode

}