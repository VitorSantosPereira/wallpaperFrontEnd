import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePhotoToList = async (uri) => {
  const existing = await AsyncStorage.getItem('@user_photos');
  let photos = existing ? JSON.parse(existing) : [];
  
  if (!photos.includes(uri)) {
    photos.push(uri);
    await AsyncStorage.setItem('@user_photos', JSON.stringify(photos));
    await AsyncStorage.setItem('@last_index', '0'); 
  }
  return photos;
};

export const getSavedPhotos = async () => {
  const existing = await AsyncStorage.getItem('@user_photos');
  return existing ? JSON.parse(existing) : [];
};

export const removePhotoFromList = async (uri) => {
  const existing = await AsyncStorage.getItem('@user_photos');
  let photos = existing ? JSON.parse(existing) : [];
  const updated = photos.filter(photo => photo !== uri);
  await AsyncStorage.setItem('@user_photos', JSON.stringify(updated));
  return updated;
};

const pickPhotoLogic = async (mode, photos) => {
  if (mode === 'aleatorio') {
    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex];
  } else {
    const lastIndexStr = await AsyncStorage.getItem('@last_index');
    let nextIndex = lastIndexStr ? parseInt(lastIndexStr) + 1 : 0;

    if (nextIndex >= photos.length) {
      nextIndex = 0;
    }

    await AsyncStorage.setItem('@last_index', nextIndex.toString());
    return photos[nextIndex];
  }
};

export const checkAndGetNextWallpaper = async (mode) => {
  const today = new Date().toDateString();
  const lastUpdate = await AsyncStorage.getItem('@last_wallpaper_date');

  if (lastUpdate === today) {
    return null;
  }

  const photos = await getSavedPhotos();
  if (photos.length === 0) return null;

  const selectedPhoto = await pickPhotoLogic(mode, photos);

  await AsyncStorage.setItem('@last_wallpaper_date', today);
  
  return selectedPhoto;
};
export const forceNextWallpaper = async (mode) => {
  const photos = await getSavedPhotos();
  if (photos.length === 0) return null;
  const selectedPhoto = await pickPhotoLogic(mode, photos);
  return selectedPhoto;
};