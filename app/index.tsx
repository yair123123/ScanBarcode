import React, { useEffect } from "react";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)'); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/splash_animation.gif')} style={styles.gif} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  gif: {
    width: 300, 
    height: 300,
  },
});

export default SplashScreen;
