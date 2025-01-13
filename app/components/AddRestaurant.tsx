import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View,Text } from "react-native";
import { saveRestaurant } from "../storage/restaurantRepository";
import { Restaurant } from "../interface/Restaurant";
export default function AddRestraunt() {
    const [input,setInput] = useState<string>('')
    const [message,setMessage] = useState<string>('')
    const addRestaurant = () => {
        setInput('')
        setMessage('')
        const rest:Restaurant =  {label:input,value:input}
        saveRestaurant(rest).then((data)=> {setMessage(data)})
        setTimeout(() => {
            setMessage('')
        }, 2000);
  
    }

    return(
    <View style={styles.container}>
        <TextInput style={styles.container} value={input} onChangeText={setInput}/>
        <Button title="Add rstaurant" color={"green"} onPress={addRestaurant}/>
        <Text>{message}</Text>
    </View>
)}
const styles = StyleSheet.create({
    container: {

    },
    input: {

    },
    button: {

    }
})