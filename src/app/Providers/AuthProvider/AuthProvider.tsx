import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useRef } from 'react';
import { getUserById } from '../../../entities/user/model/asyncActions';
import {
  setUserTelegramId,
  setUserImage,
} from '../../../entities/user/model/slice';
import { getUserId, getUserImage } from '../../../shared/lib';

export function AuthProvider() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Если userTelegramId есть, вызываем getUserById
    if (user.userTelegramId) {
      dispatch(getUserById());
      return;
    }

    // Если userTelegramId нет, пытаемся получить его повторно
    const retryGetUserData = () => {
      const userId = getUserId();
      const userImage = getUserImage();

      if (userId) {
        dispatch(setUserTelegramId(userId));
        if (userImage) {
          dispatch(setUserImage(userImage));
        }
        dispatch(getUserById());
      } else {
        // Если данные все еще недоступны, повторяем через 100мс
        retryTimeoutRef.current = setTimeout(retryGetUserData, 100);
      }
    };

    retryGetUserData();

    // Очистка таймаута при размонтировании
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [dispatch, user.userTelegramId]);

  useEffect(() => {
    if (user.isRegistered === null) return;

    if (user.isRegistered === true) {
      if (user.profile?.is_admin) {
        navigate('/admin');
      } else {
        navigate('/main');
      }
    } else {
      navigate('/register');
    }
  }, [user, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
