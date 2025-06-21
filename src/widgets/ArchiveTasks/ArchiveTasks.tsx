import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { Card, Title, Tag } from '../../shared/ui';
import styles from './ArchiveTasks.module.css';

export function ArchiveTasks() {
  const { profile } = useSelector((state: RootState) => state.user);

  // Фильтруем завершенные задачи
  const archivedTasks =
    profile?.tasks?.filter((task) =>
      task.executors.some((executor) => executor.is_complete)
    ) || [];

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 3:
        return '#ef4444'; // красный - высокий
      case 2:
        return '#f59e0b'; // желтый - средний
      case 1:
        return '#10b981'; // зеленый - низкий
      default:
        return '#6b7280';
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 3:
        return 'Высокий';
      case 2:
        return 'Средний';
      case 1:
        return 'Низкий';
      default:
        return 'Неизвестно';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (archivedTasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <Title tag='h3' className={styles.emptyTitle}>
          Архив пуст
        </Title>
        <p className={styles.emptyText}>
          Здесь будут отображаться завершенные задачи
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title tag='h2' className={styles.title}>
          Архивные задачи ({archivedTasks.length})
        </Title>
      </div>

      <div className={styles.tasksList}>
        {archivedTasks.map((task) => (
          <Card key={task.id} className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <div className={styles.taskInfo}>
                <Title tag='h3' className={styles.taskTitle}>
                  {task.task}
                </Title>
                <div className={styles.taskMeta}>
                  <Tag
                    className={styles.priorityTag}
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {getPriorityLabel(task.priority)}
                  </Tag>
                  <span className={styles.deadline}>
                    Дедлайн: {formatDate(task.deadline)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.executors}>
              <h4 className={styles.executorsTitle}>Исполнители:</h4>
              <div className={styles.executorsList}>
                {task.executors.map((executor) => (
                  <div key={executor.id} className={styles.executor}>
                    <span className={styles.executorName}>
                      {executor.executor_name}
                    </span>
                    {executor.is_complete && (
                      <span className={styles.completedBadge}>✓ Завершено</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.taskFooter}>
              <span className={styles.createdAt}>
                Создано: {formatDate(task.created_at)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
