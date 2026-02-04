import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Automacao() {
  const [modoAtivo, setModoAtivo] = useState('aleatorio');

  useEffect(() => {
    const loadPreference = async () => {
      const savedModo = await AsyncStorage.getItem('@config_modo');
      if (savedModo) setModoAtivo(savedModo);
    };
    loadPreference();
  }, []);

  const salvarModo = async (modo) => {
    setModoAtivo(modo);
    await AsyncStorage.setItem('@config_modo', modo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.mainTitle}>Configurações</Text>
        <Text style={styles.description}>Escolha como o papel de parede deve mudar.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, modoAtivo === 'aleatorio' && styles.activeButton]}
          onPress={() => salvarModo('aleatorio')}
        >
          <Text style={[styles.buttonText, modoAtivo === 'aleatorio' && styles.activeText]}>
            Modo Aleatório
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, modoAtivo === 'sequencial' && styles.activeButton]}
          onPress={() => salvarModo('sequencial')}
        >
          <Text style={[styles.buttonText, modoAtivo === 'sequencial' && styles.activeText]}>
            Modo Sequencial
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <ScrollView style={styles.aboutContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.aboutTitle}>Sobre Mim & Agradecimentos</Text>
        <Text style={styles.aboutText}>
          Olá! Este projeto foi desenvolvido para facilitar a personalização do seu dispositivo de forma inteligente.
          {"\n\n"}
          Fiz para colocar uma foto de forma aleatória e outra de forma sequencial, assim todos os dias terá uma foto da pessoa que você ama no papel de parede.
          {"\n\n"}
          Desenvolvido com foco em simplicidade e performance.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    paddingTop: 50,
  },
  headerSection: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#121212',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  buttonContainer: {
    paddingHorizontal: 25,
    gap: 15,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  activeButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  activeText: {
    color: '#FFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginHorizontal: 25,
    marginVertical: 40,
  },
  aboutContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#121212',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    paddingBottom: 40,
  },
});