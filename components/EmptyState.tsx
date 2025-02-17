import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import CustomButton from '@/ui/CustomButton';
import { router } from 'expo-router';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animation/empty.json')} // החלף בנתיב לקובץ האנימציה שלך
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>אין זיכויים כרגע</Text>
      <CustomButton style={styles.button} onPress={() => {router.replace("/(tabs)/scan")}} title={"סרוק חדש"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  button:{
    padding:10,
    margin:30,
  }
});

export default EmptyState;
