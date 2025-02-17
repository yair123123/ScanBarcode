export const restaurants = [
    { value:"Goldis" ,label: "גולדיס"},
    { value:"Humus" ,label: " חומוס נרי"},
    { value:"Jewish" ,label: "המסעדה היהודית"}
   
]
const parserRestaurant:{[key:string]:string} = {
    "Goldis": "גולדיס",
    "Humus":"חומוס נרי",
    "Jewish":"המסעדה היהודית"
}

export const parseRestaurantToHebrow = (restaurant: string) => (
    parserRestaurant[restaurant] || restaurant
);
const restaurantImages: { [key: string]: any } = {
    "Goldis": require('@/assets/images/Goldis.jpg'),
    "Humus": require('@/assets/images/Humus.jpg'),
    "Jewish": require('@/assets/images/jewish.jpg'),
};
export const getImageForRestaurant = (restaurant: string) => (
    restaurantImages[restaurant] || require('@/assets/images/default.jpg')
);