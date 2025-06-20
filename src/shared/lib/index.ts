import { retrieveRawInitData } from '@telegram-apps/sdk';

export const getUserId = () => {
  const rawData = retrieveRawInitData();

  const params = new URLSearchParams(rawData);
  const userParam = params.get('user');

  if (!userParam) {
    console.log('Пользователь не найден');
    return null;
  }

  try {
    const userData = JSON.parse(decodeURIComponent(userParam));
    return userData.id;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getUserImage = () => {
  const rawData = retrieveRawInitData();

  const params = new URLSearchParams(rawData);
  const userParam = params.get('user');

  if (!userParam) {
    console.log('Пользователь не найден');
    return null;
  }

  try {
    const userData = JSON.parse(decodeURIComponent(userParam));
    return userData.photo_url;
  } catch (e) {
    console.log(e);
    return null;
  }
};
