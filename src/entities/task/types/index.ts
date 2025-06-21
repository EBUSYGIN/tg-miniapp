export interface ITask {
  id: string;
  task: string;
  priority: string;
  deadline: Date;
  created_at: Date;
  executors: IExecutor[];
}

export interface IExecutor {
  id: string;
  executor: string;
  in_work: boolean;
  in_work_since: null | Date;
  is_complete: boolean;
  completed_at: null | boolean;
  executor_name: string;
  executor_rang: string;
}
