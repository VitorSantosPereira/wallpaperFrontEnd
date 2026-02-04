import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// Importamos a função de remover aqui
import { savePhotoToList, getSavedPhotos, removePhotoFromList } from '../services/pastaService';

const { width } = Dimensions.get('window');

export default function Fotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const savedPhotos = await getSavedPhotos();
    setPhotos(savedPhotos);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      const updatedList = await savePhotoToList(newUri);
      setPhotos(updatedList);
    }
  };

  // Função nova para apagar a foto
  const handleDelete = (photoUri) => {
    Alert.alert(
      "Remover Foto",
      "Deseja remover esta foto da sua lista?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Remover", 
          onPress: async () => {
            const updatedList = await removePhotoFromList(photoUri);
            setPhotos(updatedList);
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.mainTitle}>Sua Coleção</Text>
        <Text style={styles.description}>
          Toque e segure uma foto para removê-la.
        </Text>
      </View>

      <View style={styles.contentArea}>
        {photos.length === 0 ? (
          <View style={styles.emptyState}>
             <Text style={styles.emptyText}>Nenhuma foto selecionada</Text>
          </View>
        ) : (
          <FlatList
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onLongPress={() => handleDelete(item)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item }} style={styles.thumbnail} />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listLayout}
          />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.mainActionButton} onPress={pickImage}>
          <Text style={styles.actionText}>Adicionar Foto</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 15,
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
  contentArea: {
    flex: 1,
    paddingHorizontal: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16
  },
  listLayout: {
    paddingBottom: 20,
  },
  thumbnail: {
    width: (width - 60) / 3,
    height: (width - 60) / 3,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  footer: {
    padding: 20,
    backgroundColor: '#F0F2F5',
  },
  mainActionButton: {
    backgroundColor: '#000',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});