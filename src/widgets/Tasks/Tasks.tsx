import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { Task } from '../../entities/task/ui';
import { Card, Title } from '../../shared/ui';

import styles from './Tasks.module.css';

export function Tasks() {
  const tasks = useSelector((state: RootState) => state.user.profile?.tasks);

  return (
    <Card className={styles.card}>
      <Title tag='h1'>Текущие задачи</Title>
      <ul className={styles.tasks}>
        {tasks?.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </ul>
    </Card>
  );
}
