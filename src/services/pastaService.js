import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@meus_wallpapers';
const LAST_UPDATE_KEY = '@last_wallpaper_update';
const LAST_INDEX_KEY = '@last_wallpaper_index';

export const savePhotoToList = async (newPhotoUri) => {
  try {
    const currentList = await getSavedPhotos();
    
    if (currentList.includes(newPhotoUri)) {
      return currentList;
    }

    const updatedList = [...currentList, newPhotoUri];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return updatedList;
  } catch (e) {
    return [];
  }
};

export const getSavedPhotos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};

export const removePhotoFromList = async (photoUriToRemove) => {
  try {
    const currentList = await getSavedPhotos();
    const updatedList = currentList.filter(uri => uri !== photoUriToRemove);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return updatedList;
  } catch (e) {
    return [];
  }
};

export const checkAndGetNextWallpaper = async (modo = 'aleatorio') => {
  try {
    const photos = await getSavedPhotos();
    if (photos.length === 0) return null;

    const today = new Date().toDateString();
    const lastUpdate = await AsyncStorage.getItem(LAST_UPDATE_KEY);

     if (lastUpdate === today) {
       return null;
     }

    let nextPhotoUri = '';

    if (modo === 'aleatorio') {
      const randomIndex = Math.floor(Math.random() * photos.length);
      nextPhotoUri = photos[randomIndex];
    } else {
      const lastIndexStr = await AsyncStorage.getItem(LAST_INDEX_KEY);
      let nextIndex = lastIndexStr ? parseInt(lastIndexStr) + 1 : 0;
      
      if (nextIndex >= photos.length) nextIndex = 0;
      
      nextPhotoUri = photos[nextIndex];
      await AsyncStorage.setItem(LAST_INDEX_KEY, nextIndex.toString());
    }

    await AsyncStorage.setItem(LAST_UPDATE_KEY, today);
    return nextPhotoUri;

  } catch (e) {
    return null;
  }
};