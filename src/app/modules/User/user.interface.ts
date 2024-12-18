export interface TUser {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: false;
};