import { Icon, Title } from '../../../../shared/ui';
import { TaskProps } from './Task.props';
import styles from './Task.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store/store';

export function Task({ task, deadline, executors }: TaskProps) {
  const date = new Intl.DateTimeFormat('ru-RU', {}).format(new Date(deadline));
  const userId = useSelector((state: RootState) => state.user.userTelegramId);

  const inWork = executors.find(
    (executor) => executor.executor === userId
  )?.in_work;

  return (
    <li className={styles.task}>
      {inWork ? <Icon.Checkmark /> : <Icon.Checkminus />}
      <Title tag='h2'>{task}</Title>
      <span>{date}</span>
    </li>
  );
}
