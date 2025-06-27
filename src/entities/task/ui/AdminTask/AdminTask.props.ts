import { ITask } from '../../types';

export type TaskProps = Omit<
  React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
  'id'
> &
  ITask & {
    onTaskStatusChange?: () => void;
  };
