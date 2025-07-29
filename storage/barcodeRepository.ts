import * as SecureStore from 'expo-secure-store'




const updateBarcodeStatus = async (newBarcode: BarcodeData) => {
    const existingData: BarcodeData[] = JSON.parse(await SecureStore.getItemAsync('Barcodes') || '[]')
    const updateData: BarcodeData[] = existingData.map((barcode) => (
        barcode.value === newBarcode.value ?
            newBarcode : barcode
    ))
    await SecureStore.setItemAsync('Barcodes', JSON.stringify(updateData))
}
const saveBarcode = async (barcode: BarcodeData) => {
    console.log(barcode);
    const existingData = JSON.parse(await SecureStore.getItemAsync('Barcodes') || '[]')
    const exists = existingData.some((item: BarcodeData) => item.value === barcode.value);

    if (exists) {
        console.log("Barcode already exists");
        return false;
    }
    existingData.push(barcode)

    await SecureStore.setItemAsync('Barcodes', JSON.stringify(existingData))
    return true
}

const getBarcodes = async () => {
    return JSON.parse(await SecureStore.getItemAsync('Barcodes') || '[]')
}
const deleteBarcodeByValue = async (value: string) => {
    try {
        const allBarcodes = JSON.parse(await SecureStore.getItemAsync('Barcodes') || '[]')


        const newBarcodes = allBarcodes.filter((barcode: BarcodeData) => (barcode.value != value));

        await SecureStore.setItemAsync('Barcodes', JSON.stringify(newBarcodes))
    }
    catch (e) {
        console.log(e);
        return false

    }
    return true

}

export { saveBarcode, getBarcodes, deleteBarcodeByValue, updateBarcodeStatus }
