import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackRoutes from './src/navigation/navegacao';

import ManageWallpaper from 'react-native-manage-wallpaper';
import { checkAndGetNextWallpaper } from './src/services/pastaService';

export default function App() {

  useEffect(() => {
    const rodarAutomacao = async () => {
      const modoSalvo = await AsyncStorage.getItem('@config_modo') || 'aleatorio';

      const novaFotoUri = await checkAndGetNextWallpaper(modoSalvo);

      if (novaFotoUri) {
        console.log("Novo dia detectado! Trocando para:", novaFotoUri);
        if (Platform.OS === 'android') {
          ManageWallpaper.setWallpaper(
            { uri: novaFotoUri },
            (res) => console.log('Wallpaper alterado:', res),
            1
          );
        }
        
      } else {
        console.log("Wallpaper já atualizado hoje ou lista vazia.");
      }
    };
    rodarAutomacao();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F0F2F5" barStyle="dark-content" />
      <StackRoutes />
    </NavigationContainer>
  );
}