export interface ITask {
  id: string;
  task: string;
  priority: number; // 1 - низкий, 2 - средний, 3 - высокий
  deadline: string;
  reminders: IReminder[];
  created_at: string;
  executors: IExecutor[];
}

export interface IExecutor {
  id: string;
  executor: string;
  in_work: boolean;
  in_work_since: null | string;
  is_complete: boolean;
  completed_at: null | string;
  executor_name: string;
  executor_rang: string;
}

export interface IReminder {
  id?: string;
  remind_at: string;
}

export interface ICreateTaskForm {
  task: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string[];
  reminders: string[];
  executors: string[];
}

export interface ICreateTaskRequest {
  task: string;
  priority: number; // 1 - низкий, 2 - средний, 3 - высокий
  deadline: string;
  executors: Array<{ executor: string }>;
  reminders: Array<{ remind_at: string }>;
}

export interface SelectOption {
  value: string;
  label: string;
}
