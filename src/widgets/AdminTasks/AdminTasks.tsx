import { useEffect, useState } from 'react';
import { AdminTask } from '../../entities/task/ui';
import { Title } from '../../shared/ui';
import styles from './AdminTasks.module.css';
import { ITask } from '@/entities/task/types';
import { taskHandler } from '@/entities/task/handler';

export function AdminTasks() {
  const [adminTasks, setAdminTasks] = useState<ITask[] | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await taskHandler.getTasks();
        if (data.success) {
          setAdminTasks(data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getTasks();
  }, []);

  if (!adminTasks || adminTasks.length < 1) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📝</div>
        <Title tag='h3' className={styles.emptyTitle}>
          Нет активных задач
        </Title>
        <p className={styles.emptyText}>Вы счастливый человек</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title tag='h2' className={styles.title}>
          Текущие задачи ({adminTasks.length})
        </Title>
      </div>

      <div className={styles.tasksList}>
        {adminTasks.map((task) => (
          <AdminTask key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}
