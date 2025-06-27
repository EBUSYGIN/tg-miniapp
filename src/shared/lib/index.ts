import { retrieveRawInitData } from '@telegram-apps/sdk';
export { retrieveRawInitData };

// Функция для ожидания готовности Telegram Web App SDK
export const waitForTelegramInit = (): Promise<string> => {
  return new Promise((resolve) => {
    const checkInitData = () => {
      const rawData = retrieveRawInitData();
      if (rawData && rawData.trim() !== '') {
        resolve(rawData);
      } else {
        // Проверяем каждые 100мс
        setTimeout(checkInitData, 100);
      }
    };
    checkInitData();
  });
};

export const getUserId = () => {
  try {
    const rawData = retrieveRawInitData();

    if (!rawData || rawData.trim() === '') {
      console.log('InitData не доступен');
      return null;
    }

    const params = new URLSearchParams(rawData);
    const userParam = params.get('user');

    if (!userParam) {
      console.log('Пользователь не найден в initData');
      return null;
    }

    const userData = JSON.parse(decodeURIComponent(userParam));
    return userData.id.toString();
  } catch (e) {
    console.log('Ошибка при получении ID пользователя:', e);
    return null;
  }
};

export const getUserImage = () => {
  try {
    const rawData = retrieveRawInitData();

    if (!rawData || rawData.trim() === '') {
      console.log('InitData не доступен');
      return null;
    }

    const params = new URLSearchParams(rawData);
    const userParam = params.get('user');

    if (!userParam) {
      console.log('Пользователь не найден в initData');
      return null;
    }

    const userData = JSON.parse(decodeURIComponent(userParam));
    return userData.photo_url;
  } catch (e) {
    console.log('Ошибка при получении изображения пользователя:', e);
    return null;
  }
};
