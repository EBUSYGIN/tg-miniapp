import { Button, Icon, Title } from '../../../../shared/ui';
import { TaskProps } from './Task.props';
import styles from './Task.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store/store';
import { taskHandler } from '../../handler';
import { getUserById } from '../../../user/model/asyncActions';

export function Task({ task, deadline, executors, id }: TaskProps) {
  const date = new Intl.DateTimeFormat('ru-RU', {}).format(new Date(deadline));
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

  return (
    <li className={styles.task}>
      <Button appearance='none' onClick={getInWork}>
        {inWork ? <Icon.Checkmark /> : <Icon.Checkminus />}
      </Button>
      <Title tag='h2'>{task}</Title>
      <span>{date}</span>
    </li>
  );
}
