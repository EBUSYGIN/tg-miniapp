import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { Task } from '../../entities/task/ui';
import { Title } from '../../shared/ui';
import styles from './Tasks.module.css';

export function Tasks() {
  const tasks = useSelector((state: RootState) => state.user.profile?.tasks);

  // Фильтруем активные задачи (не завершенные)
  const activeTasks =
    tasks?.filter(
      (task) => !task.executors.some((executor) => executor.is_complete)
    ) || [];

  if (activeTasks.length === 0) {
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
          Текущие задачи ({activeTasks.length})
        </Title>
      </div>

      <div className={styles.tasksList}>
        {activeTasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}
