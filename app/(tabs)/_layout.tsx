import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import ButtonContactUs from '@/components/ButtonContactUs';
import ModalContactUs from '@/components/ModalContactUs';

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          headerRight: () => (
            <ButtonContactUs onPress={() => setModalVisible(true)} />
          ),
          tabBarActiveTintColor: '#ffd33d',
          headerStyle: { backgroundColor: '#25292e' },
          headerShadowVisible: false,
          headerTintColor: '#ffd33d',
          tabBarStyle: { backgroundColor: '#25292e' },
        }}
      >
        <Tabs.Screen
          name="scan"
          options={{
            title: 'סרוק',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'camera' : 'camera-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'ברקודים',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'barcode' : 'barcode-outline'} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
          <ModalContactUs isVisible={modalVisible} setIsVisible={() =>{setModalVisible(false)}}/>

    </>
  );
}

