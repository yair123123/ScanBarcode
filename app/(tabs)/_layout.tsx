import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }} >
      <Tabs.Screen
        name="index"
        options={{
          title: 'סרוק',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'camera': 'camera-outline'} color={color} size={24} />
          )
        }} />

      <Tabs.Screen name="listBarcode"
        options={{
          title: 'ברקודים',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'barcode' : 'barcode-outline'} color={color} size={24} />
          )
        }} />

    </Tabs>



  );
}
