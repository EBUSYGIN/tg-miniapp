import { useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserRegistrationForm } from '../../../../entities/user/types';
import { userHandler } from '../../../../entities/user/handler';
import { useState } from 'react';
import { RootState } from '../../../../app/store/store';
import { Button, Card, Input } from '../../../../shared/ui';

import styles from './RegistrationForm.module.css';

export function RegistrationForm() {
  const userId = useSelector((state: RootState) => state.user.userTelegramId);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserRegistrationForm>();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<null | boolean>(
    null
  );

  const registerUser: SubmitHandler<IUserRegistrationForm> = async (
    userData
  ) => {
    const result = await userHandler.createUser({
      ...userData,
      user_id: userId,
    });

    if (result.success) {
      setIsSubmitSuccessful(true);
    } else {
      setIsSubmitSuccessful(false);
      setError('rang', { message: 'Что-то пошло не так, попробуйте позже' });
    }
  };

  return (
    <Card>
      {isSubmitSuccessful === true ? (
        <div className={styles.successPlate}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Заявка отправлена!</h2>
          <p className={styles.successText}>
            Ваши данные отправлены администрации. Ожидайте ответа в ближайшее
            время.
          </p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(registerUser)}>
          <div>
            <h1 className={styles.title}>Регистрация</h1>
            <p className={styles.subtitle}>
              Заполните форму для получения доступа к системе управления
              задачами
            </p>
          </div>

          <div className={styles.inputGroup}>
            <Input
              placeholder='Введите ваше имя'
              label='Имя'
              {...register('name', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать минимум 2 символа',
                },
              })}
              error={errors.name?.message}
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              placeholder='Введите вашу должность'
              label='Должность'
              {...register('rang', {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 2,
                  message: 'Должность должна содержать минимум 2 символа',
                },
              })}
              error={errors.rang?.message}
            />
          </div>

          <Button
            type='submit'
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
          </Button>
        </form>
      )}
    </Card>
  );
}
