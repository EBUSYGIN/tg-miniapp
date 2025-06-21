import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RegistrationForm } from '../../features/user/ui';
import { RootState } from '../../app/store/store';
import styles from './Register.module.css';

export function Register() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь уже зарегистрирован, перенаправляем его
    if (user.isRegistered === true) {
      if (user.profile?.is_admin) {
        navigate('/admin');
      } else {
        navigate('/main');
      }
    }
  }, [user.isRegistered, user.profile?.is_admin, navigate]);

  // Если статус регистрации еще не определен, показываем загрузку
  if (user.isRegistered === null) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  // Если пользователь не зарегистрирован, показываем форму регистрации
  if (user.isRegistered === false) {
    return (
      <div className={styles.container}>
        <RegistrationForm />
      </div>
    );
  }

  // Если пользователь зарегистрирован, но еще не перенаправлен
  return null;
}
