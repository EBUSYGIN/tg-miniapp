import { CreateTaskForm } from '../../features/task/ui';
import styles from './CreateTask.module.css';

export function CreateTask() {
  return (
    <div className={styles.container}>
      <CreateTaskForm />
    </div>
  );
}
