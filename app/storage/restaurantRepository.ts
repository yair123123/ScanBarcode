import * as SecureStore from 'expo-secure-store';
import { Restaurant } from '../interface/Restaurant';



const saveRestaurant = async (restaurant: Restaurant) => {
    const existingData = JSON.parse(await SecureStore.getItemAsync('Restaurants') || '[]');
    
    const exists = existingData.some((item:Restaurant) => item.value === restaurant.value);

    if (exists) {
        console.log("Restaurant already exists");
        return "Restaurant already exists";
    }
    existingData.push(restaurant);

    await SecureStore.setItemAsync('Restaurants', JSON.stringify(existingData));
    return "Restaurant saved successfully";
};

const getAllRestaurants = async () => {
    const existingData: Restaurant[] = JSON.parse(await SecureStore.getItemAsync('Restaurants') || '[]');
    
    return existingData;
};

export { saveRestaurant, getAllRestaurants };
