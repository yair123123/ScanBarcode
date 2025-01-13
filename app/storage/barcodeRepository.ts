import * as SecureStore from 'expo-secure-store'



const saveBarcode = async (barcode: Barcode) => {
    const existingData = JSON.parse(await SecureStore.getItemAsync('Barcodes') || '[]')
    const exists = existingData.some((item:Barcode) => item.value === barcode.value);

    if (exists) {
        console.log("Barcode already exists");
        return "Barcode already exists";
    }
    existingData.push(barcode)

    await SecureStore.setItemAsync('Barcodes', JSON.stringify(existingData))
    console.log("Barcode saved successfully")
}

const getBarcode = async (restaurant: string) => {
    const exitingData: Barcode[] = JSON.parse(await SecureStore.getItemAsync('Barcodes') || '[]')
    
    return exitingData.filter((barcode) => barcode.restraunt === restaurant)
}
export {saveBarcode,getBarcode}
