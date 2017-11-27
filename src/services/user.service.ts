import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../shared/user';
import * as MOCKS from '../shared/USERS.mock';
import { UserServiceInterface } from './user-service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(public http: HttpClient) { }

  getUser(id: number): Promise<User> {
    const user = id === MOCKS.user.id ? MOCKS.user : MOCKS.userTo;
    return new Promise(resolve => setTimeout(() => resolve(user), Math.random() * 1000));
  }

}
