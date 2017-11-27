import { Injectable } from '@angular/core';

import { User } from '../shared/user';
import * as MOCKS from '../shared/USERS.mock';
import { UserServiceInterface } from './user-service.interface';

@Injectable()
export class UserServiceMock implements UserServiceInterface {
  constructor() { }

  getUser(id: number): Promise<User> {
    const user = id === MOCKS.user.id ? MOCKS.user : MOCKS.userTo;
    return new Promise(resolve => setTimeout(() => resolve(user), Math.random() * 1000));
  }

}
