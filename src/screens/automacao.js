import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import { forceNextWallpaper } from '../services/pastaService';

export default function Automacao() {
  const [modoAtivo, setModoAtivo] = useState('aleatorio');
  const [loading, setLoading] = useState(false);

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

  const handleManualChange = async () => {
    if (Platform.OS === 'web') {
      alert("A troca de wallpaper não funciona na Web.");
      return;
    }

    setLoading(true);

    try {
      const fotoUri = await forceNextWallpaper(modoAtivo);

      if (!fotoUri) {
        Alert.alert("Erro", "Você não tem fotos na lista! Adicione fotos primeiro.");
        setLoading(false);
        return;
      }

      console.log("Aplicando wallpaper manualmente:", fotoUri);
      ManageWallpaper.setWallpaper(
        { uri: fotoUri },
        (res) => {
          setLoading(false);
          Alert.alert("Sucesso!", `Wallpaper alterado para o modo: ${modoAtivo.toUpperCase()}`);
        },
        TYPE.HOME
      );

    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Falha ao mudar wallpaper: " + error.message);
    }
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
          Projeto desenvolvido para controle total do seu wallpaper.
          {"\n\n"}
          Utilize o botão acima para testar se suas fotos estão trocando corretamente sem precisar esperar o dia virar.
        </Text>
      {/* Botão de Teste Manual */}
      <View style={styles.testContainer}>
        <TouchableOpacity style={styles.testButton} onPress={handleManualChange} disabled={loading}>
          {loading ? (
             <ActivityIndicator color="#FFF" />
          ) : (
             <Text style={styles.testButtonText}>TESTAR MUDANÇA AGORA</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.testNote}>Isso força a troca imediata baseada no modo acima.</Text>
      </View>
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
  // Estilos do Botão de Teste
  testContainer: {
    marginTop: 25,
    paddingHorizontal: 25,
    alignItems: 'center'
  },
  testButton: {
    backgroundColor: '#4A90E2', // Azul para destacar
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3
  },
  testButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14
  },
  testNote: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginHorizontal: 25,
    marginVertical: 30,
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