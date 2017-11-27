import { User } from '../shared/user';

export interface UserServiceInterface {
  getUser: (id: number) => Promise<User>;
}
