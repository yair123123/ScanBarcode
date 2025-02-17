import { Button, StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import InactiveBarcode from "./InactiveBarcode";
import { ScrollView } from "react-native";

type props = {
    deleteFunc: (value:string,restaurant:string) => void,
    barcodes: { [key: string]: BarcodeData[] }
    unmarkFunc: (data:BarcodeData,value: string, restaurant: string) => void;
}
export default function ListInactiveBarcodes({unmarkFunc,deleteFunc, barcodes }: props) {

    const allBarcodes = Object.values(barcodes).flat();
    return (
        <View style={styles.container}>
            <FlatList
                data={allBarcodes}
                keyExtractor={(item, index) => item.value || index.toString()}
                renderItem={({ item }) => <InactiveBarcode unmarkFunc={unmarkFunc} deleteFunc={deleteFunc} data={item} />}
            />
        </View>

    )

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    }
})