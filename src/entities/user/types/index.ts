import { ITask } from '../../task/types';

export interface IUser {
  user_id: string;
  name: string;
  rang: string;
  is_active: boolean;
  is_admin: boolean;
  tasks: ITask[];
}

export interface IUserState {
  loadingState?: 'loading' | 'error' | 'success';
  isRegistered: boolean | null;
  userTelegramId: string | null;
  userImage: string | null;
  profile?: IUser;
}

export interface IUserRegistrationForm {
  name: string;
  rang: string;
}

export interface IUserCreate extends IUserRegistrationForm {
  user_id: string;
}
