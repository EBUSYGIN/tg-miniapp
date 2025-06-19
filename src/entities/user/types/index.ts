export interface IUser {
  userId?: string;
  name?: string;
  rang?: string;
  isActive?: boolean;
  tasks?: string[];
}

export interface IUserState {
  loadingState?: 'loading' | 'error' | 'success';
  profile?: IUser;
}
