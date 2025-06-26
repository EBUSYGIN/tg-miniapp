import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  Button,
  Textarea,
  Select,
  DatePicker,
  Card,
  Title,
  MultiSelect,
} from '../../../../shared/ui';
import {
  ICreateTaskForm,
  SelectOption,
  ICreateTaskRequest,
} from '../../../../entities/task/types';
import { IUser } from '../../../../entities/user/types';
import { userHandler } from '../../../../entities/user/handler';
import { taskHandler } from '../../../../entities/task/handler';
import styles from './CreateTaskForm.module.css';

const priorityOptions: SelectOption[] = [
  { value: 'high', label: 'Высокий' },
  { value: 'medium', label: 'Средний' },
  { value: 'low', label: 'Низкий' },
];

export function CreateTaskForm() {
  const [deadline, setDeadline] = useState<string>('');
  const [reminderDates, setReminderDates] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, setValue, watch, reset } =
    useForm<ICreateTaskForm>({
      defaultValues: {
        task: '',
        priority: 'medium',
        deadline: [],
        reminders: [],
        executors: [],
      },
    });

  // Загружаем пользователей при монтировании компонента
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      const response = await userHandler.getAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        console.error('Ошибка загрузки пользователей:', response.error);
      }
      setIsLoading(false);
    };

    loadUsers();
  }, []);

  const handleDeadlineChange = (dates: string[]) => {
    const date = dates[0] || '';
    setDeadline(date);
    setValue('deadline', date ? [date] : []);
  };

  const handleReminderChange = (dates: string[]) => {
    setReminderDates(dates);
    setValue('reminders', dates);
  };

  const validateForm = (data: ICreateTaskForm): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.task || data.task.length < 10) {
      newErrors.task = 'Текст задачи должен содержать минимум 10 символов';
    }

    if (!data.priority) {
      newErrors.priority = 'Выберите приоритет';
    }

    if (!data.executors || data.executors.length === 0) {
      newErrors.executors = 'Выберите хотя бы одного исполнителя';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertPriorityToNumber = (priority: string): number => {
    switch (priority) {
      case 'high':
        return 1; // высокий
      case 'medium':
        return 2; // средний
      case 'low':
        return 3; // низкий
      default:
        return 2;
    }
  };

  const onSubmit = async (data: ICreateTaskForm) => {
    if (!validateForm(data)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const taskRequest = {
        task: data.task,
        priority: convertPriorityToNumber(data.priority),
        deadline: deadline || '',
        executors: data.executors.map((executorId) => ({
          executor: executorId,
        })),
        reminders:
          reminderDates.length > 0
            ? reminderDates.map((date) => ({ remind_at: date }))
            : [],
      };

      const response = await taskHandler.createTask(taskRequest);

      if (response.success) {
        reset();
        setDeadline('');
        setReminderDates([]);
        setErrors({});
      } else {
        setErrors({ submit: response.error.message });
      }
    } catch (error) {
      setErrors({ submit: 'Произошла неожиданная ошибка' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444'; // красный
      case 'medium':
        return '#f59e0b'; // желтый
      case 'low':
        return '#10b981'; // зеленый
      default:
        return '#6b7280';
    }
  };

  const watchedPriority = watch('priority');

  // Создаем опции для исполнителей из загруженных пользователей
  const executorOptions: SelectOption[] = users.map((user) => ({
    value: user.user_id,
    label: `${user.name} - ${user.rang}`,
  }));

  return (
    <Card className={styles.formCard}>
      <Title tag='h2' className={styles.title}>
        Создание новой задачи
      </Title>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name='task'
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label='Текст задачи'
              placeholder='Опишите задачу подробно...'
              error={errors.task}
              rows={4}
            />
          )}
        />

        <Controller
          name='priority'
          control={control}
          render={({ field }) => (
            <div className={styles.prioritySection}>
              <Select
                {...field}
                label='Приоритет'
                options={priorityOptions}
                error={errors.priority}
              />
              {watchedPriority && (
                <div
                  className={styles.priorityIndicator}
                  style={{ backgroundColor: getPriorityColor(watchedPriority) }}
                />
              )}
            </div>
          )}
        />

        <Controller
          name='deadline'
          control={control}
          render={({}) => (
            <DatePicker
              label='Дедлайн'
              selectedDates={deadline ? [deadline] : []}
              onDateChange={handleDeadlineChange}
              error={errors.deadline}
              single
            />
          )}
        />

        <Controller
          name='reminders'
          control={control}
          render={({}) => (
            <DatePicker
              label='Напоминания'
              selectedDates={reminderDates}
              onDateChange={handleReminderChange}
              error={errors.reminders}
            />
          )}
        />

        <Controller
          name='executors'
          control={control}
          render={({ field }) => (
            <MultiSelect
              label='Исполнители'
              placeholder='Выберите исполнителей'
              options={executorOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.executors}
              disabled={isLoading}
            />
          )}
        />

        {errors.submit && (
          <div className={styles.submitError}>{errors.submit}</div>
        )}

        <div className={styles.actions}>
          <Button
            type='submit'
            appearance='primary'
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? 'Создание...' : 'Создать задачу'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
