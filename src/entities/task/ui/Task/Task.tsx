import { Button, Icon, Title, Tag, Card } from '../../../../shared/ui';
import { TaskProps } from './Task.props';
import styles from './Task.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store/store';
import { taskHandler } from '../../handler';
import { getUserById } from '../../../user/model/asyncActions';

export function Task({ task, deadline, executors, id, priority }: TaskProps) {
  const date = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(deadline));

  const userId = useSelector((state: RootState) => state.user.userTelegramId);
  const dispatch = useDispatch<AppDispatch>();

  const inWork = executors.find(
    (executor) => executor.executor === userId
  )?.in_work;

  const getInWork = async () => {
    const response = await taskHandler.getInWork(userId, id);
    console.log(response);
    dispatch(getUserById());
  };

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

  return (
    <Card className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <div className={styles.taskInfo}>
          <Title tag='h3' className={styles.taskTitle}>
            {task}
          </Title>
          <div className={styles.taskMeta}>
            <Tag
              className={styles.priorityTag}
              style={{ backgroundColor: getPriorityColor(priority) }}
            >
              {getPriorityLabel(priority)}
            </Tag>
            <span className={styles.deadline}>Дедлайн: {date}</span>
          </div>
        </div>

        <Button
          appearance='none'
          onClick={getInWork}
          className={`${styles.statusButton} ${inWork ? styles.inWork : ''}`}
        >
          {inWork ? <Icon.Checkmark /> : <Icon.Checkminus />}
        </Button>
      </div>

      <div className={styles.executors}>
        <h4 className={styles.executorsTitle}>Исполнители:</h4>
        <div className={styles.executorsList}>
          {executors.map((executor) => (
            <div key={executor.id} className={styles.executor}>
              <span className={styles.executorName}>
                {executor.executor_name}
              </span>
              {executor.in_work && (
                <span className={styles.inWorkBadge}>В работе</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
