import { useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserRegistrationForm } from '../../../../entities/user/types';
import { userHandler } from '../../../../entities/user/handler';
import { useState } from 'react';
import { RootState } from '../../../../app/store/store';
import { Button, Card, Input, Title } from '../../../../shared/ui';

import styles from './RegistrationForm.module.css';

export function RegistrationForm() {
  const userId = useSelector((state: RootState) => state.user.userTelegramId);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
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
      setError('rang', { message: 'Что то пошло не так, попытайтесь позже' });
    }
  };

  return (
    <Card>
      {isSubmitSuccessful === true ? (
        <div className={styles.successPlate}>
          ✅ Ваши данные отправлены, ожидайте ответа администрации
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(registerUser)}>
          <Title tag='h1'>Регистрация</Title>
          <Input
            placeholder='Имя:'
            label='Ваше имя'
            {...register('name', {
              required: 'Поле обязательно для заполнения',
            })}
            error={errors.name?.message}
          />
          <Input
            placeholder='Должность:'
            label='Ваша должность'
            {...register('rang', {
              required: 'Поле обязательно для заполнения',
            })}
            error={errors.rang?.message}
          />
          <Button>Зарегистрироваться</Button>
        </form>
      )}
    </Card>
  );
}
